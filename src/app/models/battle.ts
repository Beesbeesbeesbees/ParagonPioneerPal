import { Army } from "./army";

export class Battle {
    constructor(playerArmy: Army, enemyArmy: Army) {
        this.playerArmy = playerArmy;
        this.enemyArmy = enemyArmy;

        this.roundNumber = 1;
        this.currentPhase = 'FirstStrike';
        this.currentAttackQueuePosition = 0;
        
        this.enemyArmyHashCodeIndex = playerArmy.hashCodeLength;

        this.firstStrikeAttackQueue = [];
        this.normalAttackQueue = [];
        this.lastStrikeAttackQueue = [];
        this.constructAttackQueues();
    }

    playerArmy: Army;
    enemyArmy: Army;
    enemyArmyHashCodeIndex: number;

    roundNumber: number;
    currentPhase: BattlePhase;
    currentAttackQueuePosition: number;

    firstStrikeAttackQueue: AttackQueueEntry[];
    normalAttackQueue: AttackQueueEntry[];
    lastStrikeAttackQueue: AttackQueueEntry[];

    get currentPlayer(): PlayerType {
        return this.currentAttackQueue[this.currentAttackQueuePosition].player;
    }

    get currentAttackQueue(): AttackQueueEntry[] {
        return this.currentPhase === 'FirstStrike' ? this.firstStrikeAttackQueue : this.currentPhase === 'Normal' ? this.normalAttackQueue : this.lastStrikeAttackQueue;
    }

    get currentAttacker(): AttackQueueEntry {
        return this.currentAttackQueue[this.currentAttackQueuePosition];
    }

    getInitialHashCode(): string {
        const playerArmyHashCode = this.playerArmy.getInitialHashCode();
        const enemyArmyHashCode = this.enemyArmy.getInitialHashCode();
        return `${playerArmyHashCode}${enemyArmyHashCode}0`;
    }

    constructAttackQueues(): void {
        this.processPlayerIntoAttackQueues('Player');
        this.processPlayerIntoAttackQueues('Enemy');

    }

    processPlayerIntoAttackQueues(player: PlayerType): void {
        const army = player === 'Player' ? this.playerArmy : this.enemyArmy;

        for (let i = 0; i < army.unitBlocksByNormalOrder.length; i++) {
            const unitBlock = army.unitBlocksByNormalOrder[i];
            if (unitBlock.unitType.skills.firstStrike || unitBlock.unitType.skills.doubleStrike) {
                this.processUnitIntoAttackQueue(player, this.firstStrikeAttackQueue, i, unitBlock.unitCount);
            }
            if (unitBlock.unitType.skills.lastStrike || unitBlock.unitType.skills.doubleStrike) {
                this.processUnitIntoAttackQueue(player, this.lastStrikeAttackQueue, i, unitBlock.unitCount);
            }
            if (!unitBlock.unitType.skills.firstStrike && !unitBlock.unitType.skills.lastStrike && !unitBlock.unitType.skills.doubleStrike) {
                this.processUnitIntoAttackQueue(player, this.normalAttackQueue, i, unitBlock.unitCount);
            }
        }
    }

    processUnitIntoAttackQueue(player: PlayerType, queue: AttackQueueEntry[], unitBlockIndex: number, unitCount: number): void {
        for (let j = 0; j < unitCount; j++) {
            queue.push({ player, unitBlockIndex, unitIndex: j, aggregatedStateStatus: "AllAlive" });
        }
    }

    updateAttackQueueWithAliveStatusAggregates(playerAggregates: AliveStatusAggregate[], enemyAggregates: AliveStatusAggregate[]) {
        this.updateAttackQueueWithAliveStatusAggregatesForQueue(playerAggregates, enemyAggregates, this.firstStrikeAttackQueue);
        this.updateAttackQueueWithAliveStatusAggregatesForQueue(playerAggregates, enemyAggregates, this.normalAttackQueue);
        this.updateAttackQueueWithAliveStatusAggregatesForQueue(playerAggregates, enemyAggregates, this.lastStrikeAttackQueue);
    }

    updateAttackQueueWithAliveStatusAggregatesForQueue(playerAggregates: AliveStatusAggregate[], enemyAggregates: AliveStatusAggregate[], queue: AttackQueueEntry[]) {
        const playerUnitBlocks = this.playerArmy.unitBlocksByNormalOrder;
        const enemyUnitBlocks = this.enemyArmy.unitBlocksByNormalOrder;
        
        for (const queueEntry of queue) {
            const aggregate = queueEntry.player === 'Player' ? playerAggregates[queueEntry.unitBlockIndex] : enemyAggregates[queueEntry.unitBlockIndex];
            const unitBlocks = queueEntry.player === 'Player' ? playerUnitBlocks : enemyUnitBlocks;
            const unitBlock = unitBlocks[queueEntry.unitBlockIndex];
            
            if (aggregate.largestObserved === 0) {
                queueEntry.aggregatedStateStatus = "AllDead";
            }
            else if (unitBlock.unitCount === aggregate.fewestObserved) {
                queueEntry.aggregatedStateStatus = "AllAlive";
            }
            else {
                queueEntry.aggregatedStateStatus = "Mixed";
            }
        }
    }

    advanceTurn() {
        this.currentAttackQueuePosition++;

        if (this.currentAttackQueuePosition >= this.currentAttackQueue.length) {
            this.currentAttackQueuePosition = 0;

            do {
                this.currentPhase = this.currentPhase === 'FirstStrike' ? 'Normal' : this.currentPhase === 'Normal' ? 'LastStrike' : 'FirstStrike';
                if (this.currentPhase === 'FirstStrike') {
                    this.roundNumber++;
                }
            }
            while (this.currentAttackQueue.length === 0);

            return 'RoundCompleted';
        }
        else {
            return 'RoundInProgress';
        }
    }

    // Hash read/write functions below
    private extractStateValue(battleState: string, startIdx: number, length: number): number {
        return parseInt(battleState.substring(startIdx, startIdx + length), 36);
    }

    private updateStateValue(battleState: string, startIdx: number, length: number, newValue: number, useBase36: boolean = true): string {
        const valueStr = useBase36 ? newValue.toString(36).padStart(length, '0') : newValue.toString().padStart(length, '0');
        return battleState.substring(0, startIdx) + valueStr + battleState.substring(startIdx + length);
    }

    getHpOfUnitForState(battleState: string, player: PlayerType, unitBlockIndex: number, indexType: 'normal' | 'flanking'): number {
        const army = player === 'Player' ? this.playerArmy : this.enemyArmy;
        const armyStartIndex = player === 'Player' ? 0 : this.enemyArmyHashCodeIndex;
        const unitBlock = indexType === 'normal' ? army.unitBlocksByNormalOrder[unitBlockIndex] : army.unitBlocksByFlankingOrder[unitBlockIndex];
        const finalHpIndex = armyStartIndex + unitBlock.hashCodeCurrentHpPointer;
        return this.extractStateValue(battleState, finalHpIndex, unitBlock.hashCodeCurrentHpLength);
    }

    getUnitsAliveOfUnitBlockForState(battleState: string, player: PlayerType, normalUnitBlockIndex: number): number {
        const army = player === 'Player' ? this.playerArmy : this.enemyArmy;
        const armyStartIndex = player === 'Player' ? 0 : this.enemyArmyHashCodeIndex;
        const unitBlock = army.unitBlocksByNormalOrder[normalUnitBlockIndex];
        const finalUnitsAliveIndex = armyStartIndex + unitBlock.hashCodeUnitsAliveAtTopOfRoundPointer;
        return this.extractStateValue(battleState, finalUnitsAliveIndex, unitBlock.hashCodeUnitsAliveAtTopOfRoundLength);
    }

    getNormalTargetIndexForState(battleState: string, targetArmy: PlayerType): number {
        const army = targetArmy === 'Player' ? this.playerArmy : this.enemyArmy;
        const armyStartIndex = targetArmy === 'Player' ? 0 : this.enemyArmyHashCodeIndex;
        const finalNormalTargetIndex = armyStartIndex + army.normalTargetingUnitBlockIndexHashCodePointer;
        return this.extractStateValue(battleState, finalNormalTargetIndex, army.normalTargetingUnitBlockIndexHashCodeLength);
    }

    getFlankingTargetIndexForState(battleState: string, targetArmy: PlayerType): number {
        const army = targetArmy === 'Player' ? this.playerArmy : this.enemyArmy;
        const armyStartIndex = targetArmy === 'Player' ? 0 : this.enemyArmyHashCodeIndex;
        const finalFlankingTargetIndex = armyStartIndex + army.flankingTargetingUnitBlockIndexHashCodePointer;
        return this.extractStateValue(battleState, finalFlankingTargetIndex, army.flankingTargetingUnitBlockIndexHashCodeLength);
    }

    updateHpOfUnitForState(battleState: string, player: PlayerType, unitBlockIndex: number, newHp: number, indexType: 'normal' | 'flanking'): string {
        const army = player === 'Player' ? this.playerArmy : this.enemyArmy;
        const armyStartIndex = player === 'Player' ? 0 : this.enemyArmyHashCodeIndex;
        const unitBlock = indexType === 'normal' ? army.unitBlocksByNormalOrder[unitBlockIndex] : army.unitBlocksByFlankingOrder[unitBlockIndex];
        const finalHpIndex = armyStartIndex + unitBlock.hashCodeCurrentHpPointer;
        return this.updateStateValue(battleState, finalHpIndex, unitBlock.hashCodeCurrentHpLength, newHp, true);
    }

    updateUnitsAliveOfUnitBlockForState(battleState: string, player: PlayerType, normalUnitBlockIndex: number, unitsAlive: number): string {
        const army = player === 'Player' ? this.playerArmy : this.enemyArmy;
        const armyStartIndex = player === 'Player' ? 0 : this.enemyArmyHashCodeIndex;
        const unitBlock = army.unitBlocksByNormalOrder[normalUnitBlockIndex];
        const finalUnitsAliveIndex = armyStartIndex + unitBlock.hashCodeUnitsAliveAtTopOfRoundPointer;
        return this.updateStateValue(battleState, finalUnitsAliveIndex, unitBlock.hashCodeUnitsAliveAtTopOfRoundLength, unitsAlive, true);
    }

    updateNormalTargetIndexForState(battleState: string, player: PlayerType, newNormalTarget: number): string {
        const army = player === 'Player' ? this.playerArmy : this.enemyArmy;
        const armyStartIndex = player === 'Player' ? 0 : this.enemyArmyHashCodeIndex;
        const finalNormalTargetIndex = armyStartIndex + army.normalTargetingUnitBlockIndexHashCodePointer;
        return this.updateStateValue(battleState, finalNormalTargetIndex, army.normalTargetingUnitBlockIndexHashCodeLength, newNormalTarget, false);
    }

    updateFlankingTargetIndexForState(battleState: string, player: PlayerType, newFlankingTarget: number): string {
        const army = player === 'Player' ? this.playerArmy : this.enemyArmy;
        const armyStartIndex = player === 'Player' ? 0 : this.enemyArmyHashCodeIndex;
        const finalFlankingTargetIndex = armyStartIndex + army.flankingTargetingUnitBlockIndexHashCodePointer;
        return this.updateStateValue(battleState, finalFlankingTargetIndex, army.flankingTargetingUnitBlockIndexHashCodeLength, newFlankingTarget, false);
    }

    updateAllUnitsAliveCountForState(battleState: string, playerAggregates: AliveStatusAggregate[], enemyAggregates: AliveStatusAggregate[]): { newState: string, battleCompleted: boolean } {
        let anyPlayerUnitsAlive = false;
        let updatedState = battleState;
        
        const playerUnits = this.playerArmy.unitBlocksByNormalOrder;
        const enemyUnits = this.enemyArmy.unitBlocksByNormalOrder;
        const playerArmyStart = 0;
        const enemyArmyStart = this.enemyArmyHashCodeIndex;

        for (let i = 0; i < playerUnits.length; i++) {
            const unitBlock = playerUnits[i];
            const unitType = unitBlock.unitType;
            const hp = this.extractStateValue(updatedState, playerArmyStart + unitBlock.hashCodeCurrentHpPointer, unitBlock.hashCodeCurrentHpLength);
            const unitsAlive = Math.ceil(hp / unitType.maxHp);
            
            updatedState = this.updateStateValue(updatedState, playerArmyStart + unitBlock.hashCodeUnitsAliveAtTopOfRoundPointer, unitBlock.hashCodeUnitsAliveAtTopOfRoundLength, unitsAlive, true);

            if (unitsAlive > 0) {
                anyPlayerUnitsAlive = true;
            }

            playerAggregates[i].fewestObserved = Math.min(playerAggregates[i].fewestObserved, unitsAlive);
            playerAggregates[i].largestObserved = Math.max(playerAggregates[i].largestObserved, unitsAlive);
        }

        let anyEnemyUnitsAlive = false;
        for (let i = 0; i < enemyUnits.length; i++) {
            const unitBlock = enemyUnits[i];
            const unitType = unitBlock.unitType;
            const hp = this.extractStateValue(updatedState, enemyArmyStart + unitBlock.hashCodeCurrentHpPointer, unitBlock.hashCodeCurrentHpLength);
            const unitsAlive = Math.ceil(hp / unitType.maxHp);
            
            updatedState = this.updateStateValue(updatedState, enemyArmyStart + unitBlock.hashCodeUnitsAliveAtTopOfRoundPointer, unitBlock.hashCodeUnitsAliveAtTopOfRoundLength, unitsAlive, true);
            
            enemyAggregates[i].fewestObserved = Math.min(enemyAggregates[i].fewestObserved, unitsAlive);
            enemyAggregates[i].largestObserved = Math.max(enemyAggregates[i].largestObserved, unitsAlive);

            if (unitsAlive > 0) {
                anyEnemyUnitsAlive = true;
            }
        }

        return { newState: updatedState, battleCompleted: !anyPlayerUnitsAlive || !anyEnemyUnitsAlive };
    }

    getPlayerArmyHashcode(battleState: string) {
        return battleState.substring(0, this.enemyArmyHashCodeIndex);
    }

    getEnemyArmyHashcode(battleState: string) {
        return battleState.substring(this.enemyArmyHashCodeIndex, battleState.length);
    }

    updatePlayerArmyHashcode(battleState: string, newHashCode: string) {
        return newHashCode + this.getEnemyArmyHashcode(battleState);
    }

    updateEnemyArmyHashcode(battleState: string, newHashCode: string) {
        return this.getPlayerArmyHashcode(battleState) + newHashCode;
    }

    debugPrintState(battleState: string) {
        const attackingArmy = this.currentPlayer === 'Player' ? this.playerArmy : this.enemyArmy;
        const attackingUnit = attackingArmy.unitBlocksByNormalOrder[this.currentAttacker.unitBlockIndex].unitType;
        console.log(`Current Player: ${this.currentPlayer} - Current Phase: ${this.currentPhase} - Current Attacker: ${attackingUnit.name}`);
        console.log("Player Army:");
        for (let i = 0; i < this.playerArmy.unitBlocksByNormalOrder.length; i++) {
            const unit = this.playerArmy.unitBlocksByNormalOrder[i].unitType;
            const hp = this.getHpOfUnitForState(battleState, 'Player', i, 'normal');
            const unitsAlive = Math.ceil(hp / unit.maxHp);
            console.log(`   Unit ${ unit.name}: ${ unitsAlive } alive - HP ${ hp }`);
        }
        console.log("Enemy Army:");
        for (let i = 0; i < this.enemyArmy.unitBlocksByNormalOrder.length; i++) {
            const unit = this.enemyArmy.unitBlocksByNormalOrder[i].unitType;
            const hp = this.getHpOfUnitForState(battleState, 'Enemy', i, 'normal');
            const unitsAlive = Math.ceil(hp / unit.maxHp);
            console.log(`   Unit ${ unit.name }: ${ unitsAlive } alive - HP ${ hp }`);
        }
    }
};

export type BattlePhase = 'FirstStrike' | 'Normal' | 'LastStrike';
export type PlayerType = 'Player' | 'Enemy';


export type AttackQueueEntry = { 
    player: PlayerType,
    unitBlockIndex: number,
    unitIndex: number,
    aggregatedStateStatus: AliveStatusAggregateType
}


export type AdvanceTurnResult = 'RoundInProgress' | 'RoundCompleted';

export type AliveStatusAggregate = { unitIndex: number, fewestObserved: number, largestObserved: number };
export type AliveStatusAggregateType = "AllAlive" | "Mixed" | "AllDead"