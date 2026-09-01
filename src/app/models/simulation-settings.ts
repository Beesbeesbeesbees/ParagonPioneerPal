import { EnemyArmyInterface, HumanArmyInterface } from "./army-interface";

export type SimulationSettings = {
    winThreshold: number;
    winHourPerLossScoreWeight: number;
    lossLossScoreWeight: number;
    lossHourPerKillScoreWeight: number;
    maxBattleStatesTracked: number;
    maxInitialSims: number;
    maxThreads: number | null;

    playerUnitValueInterface: HumanArmyInterface;
    enemyUnitValueInterface: EnemyArmyInterface;
};

export class SimulationSettingDefaults {
    static getDefaultSettings(playerUnitValueInterface: HumanArmyInterface, enemyUnitValueInterface: EnemyArmyInterface): SimulationSettings {
        return {
            winThreshold: 0.999,
            maxBattleStatesTracked: 1000,
            winHourPerLossScoreWeight: 2,
            lossLossScoreWeight: 0.5,
            lossHourPerKillScoreWeight: 2,
            maxInitialSims: 2000,
            maxThreads: null,
            playerUnitValueInterface: playerUnitValueInterface,
            enemyUnitValueInterface: enemyUnitValueInterface
        };
    }
}