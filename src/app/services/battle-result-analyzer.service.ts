import { Battle } from "../models/battle";
import { BattleResult, ScoredBattleResult } from "../models/battle-result";
import { UnitInfo, unitInfos } from "../models/unitTypes";
import { Army, ArmyDefinition } from "../models/army";
import { UnitBlock } from "../models/unit-block";
import { EnemyArmyInterface, HumanArmyInterface } from "../models/army-interface";
import { SimulationSettingsService } from "./simulation-settings.service";

export class BattleResultAnalyzerService {
    private static instance: BattleResultAnalyzerService;

    private constructor() {}

    static getInstance(): BattleResultAnalyzerService {
        if (!BattleResultAnalyzerService.instance) {
            BattleResultAnalyzerService.instance = new BattleResultAnalyzerService();
        }
        return BattleResultAnalyzerService.instance;
    }

    analyze(battleDef: Battle, finalBattleState: string): BattleResult {
        const playerLosses: { type: UnitInfo, count: number }[] = [];
        const enemyLosses: { type: UnitInfo, count: number }[] = [];
        let won = true;
        let hashKey = "";

        const playerUnitBlocks = battleDef.playerArmy.unitBlocksByNormalOrder;
        const enemyUnitBlocks = battleDef.enemyArmy.unitBlocksByNormalOrder;

        for (let i = 0; i < playerUnitBlocks.length; i++) {
            const unit = playerUnitBlocks[i];
            const startingCount = unit.unitCount;
            const endingCount = battleDef.getUnitsAliveOfUnitBlockForState(finalBattleState, 'Player', i);
            const lossCount = startingCount - endingCount;

            if (lossCount > 0) {
                playerLosses.push({ type: unit.unitType, count: lossCount });
            }
            
            hashKey += `${lossCount}|`;
        }

        for (let i = 0; i < enemyUnitBlocks.length; i++) {
            const unit = enemyUnitBlocks[i];
            const startingCount = unit.unitCount;
            const endingCount = battleDef.getUnitsAliveOfUnitBlockForState(finalBattleState, 'Enemy', i);
            const lossCount = startingCount - endingCount;

            if (lossCount > 0) {
                enemyLosses.push({ type: unit.unitType, count: lossCount });
            }

            if (endingCount > 0) {
                won = false;
            }

            hashKey += `${lossCount}|`;
        }
        
        const result: BattleResult = {
            won: won,
            playerLosses: playerLosses,
            enemyLosses: enemyLosses,
            hashKey: hashKey
        };

        return result;
    }

    scoreBattleResult(battleResult: BattleResult): ScoredBattleResult {
        let killScore = 0;
        let lossScore = 0;

        const humanScoreDef = SimulationSettingsService.getInstance().settings.playerUnitValueInterface;
        const orcScoreDef = SimulationSettingsService.getInstance().settings.enemyUnitValueInterface;

        for (const loss of battleResult.playerLosses) {
            const unitScore = humanScoreDef[loss.type.name];
            lossScore += loss.count * unitScore;
            
        }

        for (const kill of battleResult.enemyLosses) {
            const unitScore = orcScoreDef[kill.type.name];
            killScore += kill.count * unitScore;
        }

        return {
            ...battleResult,
            killScore: killScore,
            lossScore: lossScore
        };
    }

    getBattleTimeInSeconds(playerArmy: ArmyDefinition, enemyArmy: ArmyDefinition): number {
        let tierSum = 0;
        unitInfos.forEach(u => {
            tierSum += u.tier * ((playerArmy.filter(ut => ut.unit.name === u.name).map(ut => ut.count).reduce((a, b) => a + b, 0 || 0) + (enemyArmy.filter(ut => ut.unit.name === u.name).map(ut => ut.count).reduce((a, b) => a + b, 0 || 0))));
        })
        let result = Math.round(Math.pow(tierSum * 2, 1.4));

        const berserk = SimulationSettingsService.getInstance().settings.berserkCustodianEnabled;

        if (berserk) result = Math.max(0, result - 2 * 60 * 60) / 2;
        
        return Math.min(result, 8 * 60 * 60);
    }
}