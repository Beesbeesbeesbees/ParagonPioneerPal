import { BattleResultAnalyzerService } from "../services/battle-result-analyzer.service";
import { SimulationSettingsService } from "../services/simulation-settings.service";
import { ArmyDefinition } from "./army";
import { BattleResult } from "./battle-result";
import { ProbabilityValueMap } from "./probability";

export type SimulationResult = {
    playerArmy: ArmyDefinition;
    enemyArmy: ArmyDefinition;
    results: ProbabilityValueMap<string, BattleResult>
    calculationMilliseconds: number;
}


export class SimulationResultAggregated implements SimulationResult {
    playerArmy: ArmyDefinition;
    enemyArmy: ArmyDefinition;
    results: ProbabilityValueMap<string, BattleResult>
    calculationMilliseconds: number;

    averagePlayerUnitLossMap: Map<string, number> = new Map();
    averageEnemyUnitLossMap: Map<string, number> = new Map();

    aggregatedWinPercent: number;
    aggregatedKillScore: number;
    aggregatedLossScore: number;
    weightedWinScore: number;
    weightedLossScore: number;
    battleSeconds: number;
    battleSecondsFriendlyText: string;
    

    constructor(simResult: SimulationResult) {
        this.playerArmy = simResult.playerArmy.filter(x => x.count > 0);
        this.enemyArmy = simResult.enemyArmy.filter(x => x.count > 0);
        this.results = simResult.results;
        this.calculationMilliseconds = simResult.calculationMilliseconds;

        this.averagePlayerUnitLossMap = new Map();
        this.averageEnemyUnitLossMap = new Map();

        const settings = SimulationSettingsService.getInstance().settings;
        this.aggregatedWinPercent = 0;
        this.aggregatedKillScore = 0;
        this.aggregatedLossScore = 0;
        this.weightedWinScore = 0;
        this.weightedLossScore = 0;
        
        this.battleSeconds = BattleResultAnalyzerService.getInstance().getBattleTimeInSeconds(this.playerArmy, this.enemyArmy, false);
        this.battleSecondsFriendlyText = SimulationResultAggregated.formatSeconds(this.battleSeconds);

        for (const [key, result] of simResult.results.entries()) {
            if (result.record.won) {
                this.aggregatedWinPercent += result.probability;
            }

            const aggregatedScores = BattleResultAnalyzerService.getInstance().scoreBattleResult(result.record);
            this.aggregatedKillScore += aggregatedScores.killScore * result.probability;
            this.aggregatedLossScore += aggregatedScores.lossScore * result.probability;
            
            for (const unitLoss of result.record.playerLosses) {
                if (!this.averagePlayerUnitLossMap.get(unitLoss.type.name)) {
                    this.averagePlayerUnitLossMap.set(unitLoss.type.name, unitLoss.count * result.probability);
                } else {
                    this.averagePlayerUnitLossMap.set(unitLoss.type.name, this.averagePlayerUnitLossMap.get(unitLoss.type.name)! + unitLoss.count * result.probability);
                }
            }

            for (const unitLoss of result.record.enemyLosses) {
                if (!this.averageEnemyUnitLossMap.get(unitLoss.type.name)) {
                    this.averageEnemyUnitLossMap.set(unitLoss.type.name, unitLoss.count * result.probability);
                } else {
                    this.averageEnemyUnitLossMap.set(unitLoss.type.name, this.averageEnemyUnitLossMap.get(unitLoss.type.name)! + unitLoss.count * result.probability);
                }
            }
        }

        for (const [key, value] of this.averagePlayerUnitLossMap.entries()) {
            this.averagePlayerUnitLossMap.set(key, Math.round(value * 100) / 100);
        }

        for (const [key, value] of this.averageEnemyUnitLossMap.entries()) {
            this.averageEnemyUnitLossMap.set(key, Math.round(value * 100) / 100);
        }

        const timePenaltyScore = this.battleSeconds * settings.winHourPerLossScoreWeight / 60 / 60;

        // Lower is better (Looking for least losses)
        this.weightedWinScore = this.aggregatedLossScore + timePenaltyScore;

        // Higher is better
        this.weightedLossScore =
            this.aggregatedKillScore
            - this.aggregatedLossScore * settings.lossLossScoreWeight
            - timePenaltyScore;
        
    }

    private static formatSeconds(seconds: number): string {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = (seconds % 60).toFixed(0);
        return `${hours.toString().padStart(2, '0')}h:${minutes.toString().padStart(2, '0')}m:${secs.padStart(2, '0')}s`;
    }
}