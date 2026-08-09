import { SimulationComparisonResult } from "../models/simulation-comparison-result";
import { TopologyPoint } from "./unit-topology.service";
import { SimulationSettingsService } from "./simulation-settings.service";
import { SimulationResultAggregated } from "../models/simulation-result";

export class SimulationComparisonService {
    private static instance: SimulationComparisonService;

    private constructor() {}

    static getInstance(): SimulationComparisonService {
        if (!SimulationComparisonService.instance) {
            SimulationComparisonService.instance = new SimulationComparisonService();
        }
        return SimulationComparisonService.instance;
    }

    compareSimulations(resultPointPairs: { topologyPoint: TopologyPoint, simResult: SimulationResultAggregated }[]): SimulationComparisonResult {
        const settings = SimulationSettingsService.getInstance().settings;

        const top5Wins = resultPointPairs
            .filter(x => x.simResult.aggregatedWinPercent >= settings.winThreshold)
            .toSorted((a, b) => a.simResult.weightedWinScore - b.simResult.weightedWinScore)
            .slice(0, 5);

        const top5Losses = resultPointPairs
            .filter(x => x.simResult.aggregatedWinPercent < settings.winThreshold)
            .toSorted((a, b) => b.simResult.weightedLossScore - a.simResult.weightedLossScore)
            .slice(0, 5);

        return {
            top5Wins: top5Wins,
            top5Losses: top5Losses
        }
    }
}