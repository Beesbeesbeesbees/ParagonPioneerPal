import { ArmyDefinition } from '../models/army';
import { ArmyService } from './army.service';
import { AliveStatusAggregate, Battle } from '../models/battle';
import { BattleCalculationService } from './battle-calculation.service';
import { BattleResultAnalyzerService } from './battle-result-analyzer.service';
import { BattleResult } from '../models/battle-result';
import { ProbabilityValueMap } from '../models/probability';
import { SimulationResult } from '../models/simulation-result';
import { SimulationSettings } from '../models/simulation-settings';

export class BattleSimulationService {
    private static instance: BattleSimulationService;
    private armyService: ArmyService;
    private battleCalculationService: BattleCalculationService;
    private battleResultAnalyzerService: BattleResultAnalyzerService;

    private constructor() {
        this.armyService = ArmyService.getInstance();
        this.battleCalculationService = BattleCalculationService.getInstance();
        this.battleResultAnalyzerService = BattleResultAnalyzerService.getInstance();
    }

    static getInstance(): BattleSimulationService {
        if (!BattleSimulationService.instance) {
            BattleSimulationService.instance = new BattleSimulationService();
        }
        return BattleSimulationService.instance;
    }

    simulate(playerArmyDef: ArmyDefinition, enemyArmyDef: ArmyDefinition, settings: SimulationSettings): SimulationResult {
        const timeToComputeStart = performance.now();
        const playerArmy = this.armyService.constructArmy(playerArmyDef);
        const enemyArmy = this.armyService.constructArmy(enemyArmyDef);

        const battle = new Battle(playerArmy, enemyArmy);
        const initialState = battle.getInitialHashCode();

        let inProgressStateQueue: Map<string, number> = new Map([[initialState, 1]]);
        const completedMap: ProbabilityValueMap<string, BattleResult> = new Map();
        const maxStates = settings.maxBattleStatesTracked;
        
        const playerUnitBlocks = battle.playerArmy.unitBlocksByNormalOrder;
        const enemyUnitBlocks = battle.enemyArmy.unitBlocksByNormalOrder;
        const playerUnitAliveAggregate: AliveStatusAggregate[] = playerUnitBlocks.map((block, index) => 
            ({ unitIndex: index, fewestObserved: block.unitCount, largestObserved: 0 })
        );
        const enemyUnitAliveAggregate: AliveStatusAggregate[] = enemyUnitBlocks.map((block, index) => 
            ({ unitIndex: index, fewestObserved: block.unitCount, largestObserved: 0 })
        );

        if (battle.firstStrikeAttackQueue.length === 0) {
            battle.advanceTurn();
        }

        while (inProgressStateQueue.size > 0) {
            // If the in-progress state queue is too large (greater than N maximumActiveStates), trim it down to the top N most probable states
            if (inProgressStateQueue.size > maxStates) {
                const entries = Array.from(inProgressStateQueue.entries());
                entries.sort(([, a], [, b]) => b - a);
                inProgressStateQueue = new Map(entries.slice(0, maxStates));
            }

            let resultStates: Map<string, number> = new Map();
            const currentAttacker = battle.currentAttacker;
            const currentAggregateStatus = currentAttacker?.aggregatedStateStatus;

            if (currentAggregateStatus === "AllDead") {
                // Optimization - If no units are alive in any known state, skip attack resolution
                resultStates = inProgressStateQueue;
            }
            else {
                const calcService = this.battleCalculationService;
                
                for (const [battleState, previousProbability] of inProgressStateQueue.entries()) {
                    const attackResult = calcService.resolveCurrentAttackForState(battle, battleState);
                    const resultMap = attackResult.resultMap;
                    
                    // Use forEach for better iteration performance than entries()
                    resultMap.forEach((probability, state) => {
                        const weightedProbability = previousProbability * probability;
                        const current = resultStates.get(state);
                        resultStates.set(state, current ? current + weightedProbability : weightedProbability);
                    });
                }
            }

            const advanceTurnResult = battle.advanceTurn();

            if (advanceTurnResult === 'RoundInProgress') {
                inProgressStateQueue = resultStates;
            }
            else {
                inProgressStateQueue = new Map<string, number>();

                for (const [state, probability] of resultStates.entries()) {
                    const { newState, battleCompleted } = battle.updateAllUnitsAliveCountForState(
                        state, 
                        playerUnitAliveAggregate, 
                        enemyUnitAliveAggregate
                    );

                    if (battleCompleted) {
                        const battleResult = this.battleResultAnalyzerService.analyze(battle, newState);
                        const hashKey = battleResult.hashKey;

                        const existingResult = completedMap.get(hashKey);
                        if (existingResult) {
                            existingResult.probability += probability;
                        } else {
                            completedMap.set(hashKey, { record: battleResult, probability });
                        }
                    }
                    else {
                        const current = inProgressStateQueue.get(newState);
                        inProgressStateQueue.set(newState, current ? current + probability : probability);
                    }
                }

                battle.updateAttackQueueWithAliveStatusAggregates(playerUnitAliveAggregate, enemyUnitAliveAggregate);
            }
        }

        let probabilitySum = 0;
        for (const value of completedMap.values()) {
            probabilitySum += value.probability;
        }

        if (probabilitySum < 0.9999 || probabilitySum > 1.0001) {
            const weightedModifier = 1 / probabilitySum;
            for (const value of completedMap.values()) {
                value.probability *= weightedModifier;
            }
        }

        return {
            playerArmy: playerArmyDef,
            enemyArmy: enemyArmyDef,
            results: completedMap,
            calculationMilliseconds: performance.now() - timeToComputeStart
        };
    }
}