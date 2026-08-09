import { TopologyPoint } from "../services/unit-topology.service";
import { SimulationResult, SimulationResultAggregated } from "./simulation-result";

export type SimulationComparisonResult = {
    top5Wins: { topologyPoint: TopologyPoint, simResult: SimulationResultAggregated }[];
    top5Losses: { topologyPoint: TopologyPoint, simResult: SimulationResultAggregated }[];
};