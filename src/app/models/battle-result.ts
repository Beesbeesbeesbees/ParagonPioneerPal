import { UnitInfo } from "./unitTypes";

export type BattleResult = {
    won: boolean;

    playerLosses: { type: UnitInfo, count: number }[];
    enemyLosses: { type: UnitInfo, count: number }[];

    hashKey: string;
}

export type ScoredBattleResult = BattleResult & {
    killScore: number;
    lossScore: number;
}