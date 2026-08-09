import { Battle, PlayerType } from "../models/battle";

export class BattleCalculationService {
    private static instance: BattleCalculationService;

    private constructor() {}

    static getInstance(): BattleCalculationService {
        if (!BattleCalculationService.instance) {
            BattleCalculationService.instance = new BattleCalculationService();
        }
        return BattleCalculationService.instance;
    }

    resolveCurrentAttackForState(battle: Battle, battleState: string): { attackingUnitWasAlive: boolean, resultMap: Map<string, number> } {
        const currentAttackQueueEntry = battle.currentAttacker;
        const aggregatedStateStatus = currentAttackQueueEntry.aggregatedStateStatus;

        let isUnitAliveToAttack: boolean;
        if (aggregatedStateStatus === "AllAlive") {
            // Optimization - If this unit is known to be alive in all states, skip the lookup
            isUnitAliveToAttack = true;
        }
        else {
            const attackingUnitsAliveAtTopOfRound = battle.getUnitsAliveOfUnitBlockForState(battleState, currentAttackQueueEntry.player, currentAttackQueueEntry.unitBlockIndex);
            isUnitAliveToAttack = attackingUnitsAliveAtTopOfRound > currentAttackQueueEntry.unitIndex;
        }
        
        if (!isUnitAliveToAttack) {
            return { attackingUnitWasAlive: false, resultMap: new Map([[battleState, 1]]) };
        }
        
        const currentPlayer = battle.currentPlayer;
        const isPlayerAttacking = currentPlayer === 'Player';
        const attackingArmy = isPlayerAttacking ? battle.playerArmy : battle.enemyArmy;
        const targetedArmy = isPlayerAttacking ? battle.enemyArmy : battle.playerArmy;
        const targetedPlayer = isPlayerAttacking ? 'Enemy' : 'Player';
        
        const attackingUnitBlock = attackingArmy.unitBlocksByNormalOrder[currentAttackQueueEntry.unitBlockIndex];
        const attackingUnitType = attackingUnitBlock.unitType;
        const isFlanking = attackingUnitType.skills.flanking;
        const hasTrample = attackingUnitType.skills.trample;
        const critChance = attackingUnitType.crit;
        const attackPower = attackingUnitType.attack;
        
        const targetUnitBlockIndex = isFlanking ? 
            battle.getFlankingTargetIndexForState(battleState, targetedPlayer) :
            battle.getNormalTargetIndexForState(battleState, targetedPlayer);

        const targetedUnitBlock = isFlanking ? targetedArmy.unitBlocksByFlankingOrder[targetUnitBlockIndex] : targetedArmy.unitBlocksByNormalOrder[targetUnitBlockIndex];
        const targetedUnitBlockHp = battle.getHpOfUnitForState(battleState, targetedPlayer, targetUnitBlockIndex, isFlanking ? 'flanking' : 'normal');

        if (targetedUnitBlockHp <= 0) {
            // Targeting should be kept up to date, so if target block has no HP, no attacks are left to be made for the active player.
            return { attackingUnitWasAlive: true, resultMap: new Map([[battleState, 1]]) };
        }

        const targetMaxHp = targetedUnitBlock.unitType.maxHp;
        let hpOfTopUnitOfTargetedUnitBlock = targetedUnitBlockHp % targetMaxHp;
        hpOfTopUnitOfTargetedUnitBlock = hpOfTopUnitOfTargetedUnitBlock === 0 ? targetMaxHp : hpOfTopUnitOfTargetedUnitBlock;

        const indexType = isFlanking ? 'flanking' : 'normal';

        if (hpOfTopUnitOfTargetedUnitBlock <= attackPower && !hasTrample) {
            // Simple case - Attack kills top unit of stack and trample isn't a factor. Only one possible outcome of this attack.
            const newTargetUnitBlockHp = targetedUnitBlockHp - hpOfTopUnitOfTargetedUnitBlock;
            let resultState = battle.updateHpOfUnitForState(battleState, targetedPlayer, targetUnitBlockIndex, newTargetUnitBlockHp, indexType);

            if (newTargetUnitBlockHp <= 0) {
                resultState = this.updateStateTargeting(battle, resultState, targetedPlayer).newState;
            }

            return { attackingUnitWasAlive: true, resultMap: new Map([[resultState, 1]]) };
        }
        else if (!hasTrample) {
            // Attack will have two possible outcomes depending on crit, but no trample
            const normalDamage = Math.min(hpOfTopUnitOfTargetedUnitBlock, attackPower);
            const critDamage = Math.min(hpOfTopUnitOfTargetedUnitBlock, attackPower * 2);

            const stackHpRemainingNormal = targetedUnitBlockHp - normalDamage;
            const stackHpRemainingCritical = targetedUnitBlockHp - critDamage;

            let normalState = battle.updateHpOfUnitForState(battleState, targetedPlayer, targetUnitBlockIndex, stackHpRemainingNormal, indexType);
            let criticalState = battle.updateHpOfUnitForState(battleState, targetedPlayer, targetUnitBlockIndex, stackHpRemainingCritical, indexType);

            if (stackHpRemainingNormal <= 0) {
                normalState = this.updateStateTargeting(battle, normalState, targetedPlayer).newState;
            }
            if (stackHpRemainingCritical <= 0) {
                criticalState = this.updateStateTargeting(battle, criticalState, targetedPlayer).newState;
            }

            return {
                attackingUnitWasAlive: true, 
                resultMap: new Map([
                    [normalState, 1 - critChance],
                    [criticalState, critChance]
                ])
            };
        }
        else {
            // Trample - We don't care about the HP of the unit at the top of the stack, but the damage may propagate down to additional stacks
            let normalTrampleDamageToApply = attackPower;
            let criticalTrampleDamageToApply = attackPower * 2;

            let normalAttackTargetHp = targetedUnitBlockHp;
            let criticalAttackTargetHp = targetedUnitBlockHp;

            let normalTargetIndex = targetUnitBlockIndex;
            let critTargetIndex = targetUnitBlockIndex;

            let shouldContinueTrample = false;
            let normalState = battleState;
            let criticalState = battleState;

            // Normal damage trample
            do {
                const damageThisHit = Math.min(normalTrampleDamageToApply, normalAttackTargetHp);
                normalTrampleDamageToApply -= damageThisHit;

                const newHp = normalAttackTargetHp - damageThisHit;
                normalState = battle.updateHpOfUnitForState(normalState, targetedPlayer, normalTargetIndex, newHp, indexType);
                
                if (newHp === 0){ 
                    const retargetResult = this.updateStateTargeting(battle, normalState, targetedPlayer);
                    normalState = retargetResult.newState;
                    normalTargetIndex = isFlanking ? retargetResult.newFlankingTargetIndex : retargetResult.newNormalTargetIndex;
                    normalAttackTargetHp = isFlanking ? retargetResult.newFlankingTargetHp : retargetResult.newNormalTargetHp;
                    shouldContinueTrample = !retargetResult.isTargetingExhausted;
                }
                else {
                    shouldContinueTrample = false;
                }
            } while (shouldContinueTrample);

            // Critical damage trample
            shouldContinueTrample = false;
            do {
                const damageThisHit = Math.min(criticalTrampleDamageToApply, criticalAttackTargetHp);
                criticalTrampleDamageToApply -= damageThisHit;

                const newHp = criticalAttackTargetHp - damageThisHit;
                criticalState = battle.updateHpOfUnitForState(criticalState, targetedPlayer, critTargetIndex, newHp, indexType);
                
                if (newHp === 0){ 
                    const retargetResult = this.updateStateTargeting(battle, criticalState, targetedPlayer);
                    criticalState = retargetResult.newState;
                    critTargetIndex = isFlanking ? retargetResult.newFlankingTargetIndex : retargetResult.newNormalTargetIndex;
                    criticalAttackTargetHp = isFlanking ? retargetResult.newFlankingTargetHp : retargetResult.newNormalTargetHp;
                    shouldContinueTrample = !retargetResult.isTargetingExhausted;
                }
                else {
                    shouldContinueTrample = false;
                }
            } while (shouldContinueTrample);

            if (normalState === criticalState) {
                return {
                    attackingUnitWasAlive: true, 
                    resultMap: new Map([[normalState, 1]]),
                };
            }
            else {
                return {
                    attackingUnitWasAlive: true, 
                    resultMap: new Map([
                        [normalState, 1 - critChance],
                        [criticalState, critChance]
                    ])
                };
            }
        }
    }


    updateStateTargeting(battle: Battle, battleState: string, targetedPlayer: PlayerType): TargetUpdateResult {
        const targetedArmy = battle.currentPlayer === 'Player' ? battle.enemyArmy : battle.playerArmy;
        let targetingExhausted: boolean = false;

        let normalTargetHp: number = 0;
        let flankingTargetHp: number = 0;

        const normalUnitBlocks = targetedArmy.unitBlocksByNormalOrder;
        const flankingUnitBlocks = targetedArmy.unitBlocksByFlankingOrder;
        const normalBlockCount = normalUnitBlocks.length;
        const flankingBlockCount = flankingUnitBlocks.length;

        const originalNormalTargetIndex = battle.getNormalTargetIndexForState(battleState, targetedPlayer);
        let normalTargetIndex = originalNormalTargetIndex;

        while (normalTargetIndex < normalBlockCount) {
            normalTargetHp = battle.getHpOfUnitForState(battleState, targetedPlayer, normalTargetIndex, 'normal');

            if (normalTargetHp <= 0) {
                if (normalTargetIndex === normalBlockCount - 1) {
                    targetingExhausted = true;
                    break;
                }
                else {
                    normalTargetIndex++;
                }
            }
            else {
                break;
            }
        }

        if (normalTargetIndex !== originalNormalTargetIndex) {
            battleState = battle.updateNormalTargetIndexForState(battleState, targetedPlayer, normalTargetIndex);
        }

        const originalFlankingTargetIndex = battle.getFlankingTargetIndexForState(battleState, targetedPlayer);
        let flankingTargetIndex = originalFlankingTargetIndex;

        while (flankingTargetIndex < flankingBlockCount) {
            flankingTargetHp = battle.getHpOfUnitForState(battleState, targetedPlayer, flankingTargetIndex, 'flanking');

            if (flankingTargetHp <= 0) {
                if (flankingTargetIndex === flankingBlockCount - 1) {
                    targetingExhausted = true;
                    break;
                }
                else {
                    flankingTargetIndex++;
                }
            }
            else {
                break;
            }
        }

        if (flankingTargetIndex !== originalFlankingTargetIndex) {
            battleState = battle.updateFlankingTargetIndexForState(battleState, targetedPlayer, flankingTargetIndex);
        }

        return {
            newNormalTargetIndex: normalTargetIndex,
            newFlankingTargetIndex: flankingTargetIndex,
            newNormalTargetHp: normalTargetHp,
            newFlankingTargetHp: flankingTargetHp,
            isTargetingExhausted: targetingExhausted,
            newState: battleState
        };
    }
}

type TargetUpdateResult = {
    newNormalTargetIndex: number;
    newFlankingTargetIndex: number;

    newNormalTargetHp: number;
    newFlankingTargetHp: number;

    isTargetingExhausted: boolean;

    newState: string;
}