import { signal } from "@angular/core";
import { ArmyDefinition } from "../models/army";
import { Simulation } from "../models/simulation";
import { WebWorkerManager } from "../workers/web-worker-manager";
import { SimulationSettingsService } from "./simulation-settings.service";
import { TopologyPoint, UnitTopologyService } from "./unit-topology.service";
import { SimulationComparisonService } from "./simulation-comparison.service";

export class SimulationManagerService {
    private static instance: SimulationManagerService;
    private unitTopologyService: UnitTopologyService;
    private simulationSettingsService: SimulationSettingsService;
    private simulationComparisonService: SimulationComparisonService;

    private constructor() {
        this.unitTopologyService = UnitTopologyService.getInstance();
        this.simulationSettingsService = SimulationSettingsService.getInstance();
        this.simulationComparisonService = SimulationComparisonService.getInstance();
    }

    static getInstance(): SimulationManagerService {
        if (!SimulationManagerService.instance) {
            SimulationManagerService.instance = new SimulationManagerService();
        }
        return SimulationManagerService.instance;
    }

    createSimulation(humanArmyDef: ArmyDefinition, enemyArmyDef: ArmyDefinition): Simulation {
        const result = {
            humanArmyDef: [...humanArmyDef],
            enemyArmyDef: [...enemyArmyDef],
            progressNumerator: signal(null),
            progressDenominator: signal(null),
            progressText: signal("Queued"),
            bestWinResult: undefined,
            bestLossResult: undefined,
            isStarted: false,
            isInvalid: false
        };

        return result;
    }


    async runSimulation(simulation: Simulation) {
        simulation.isStarted = true;
        const workerManager = new WebWorkerManager();
        simulation.progressNumerator = workerManager.statusSignalNumerator;
        simulation.progressDenominator = workerManager.statusSignalDenominator;
        simulation.progressText.set("Initializing");
        
        const startingSimulationsToRun = this.unitTopologyService.generateTopologyWithUpperBounds(simulation.humanArmyDef, this.simulationSettingsService.settings.maxInitialSims);
        const simulationsRanHashmap = new Set(startingSimulationsToRun.map(sim => UnitTopologyService.getInstance().getTopologyPointHashCode(sim)));
        
        const humanArmyDef = simulation.humanArmyDef;
        const enemyArmyDef = simulation.enemyArmyDef;
        simulation.progressText.set("Initial Simulations");
        let refinementPass: number = 1;

        const initialSimResults = await workerManager.runBatchedWork(startingSimulationsToRun.map(sim => ({ sim, humanArmyDef, enemyArmyDef })));

        let lastBatchComparison = this.simulationComparisonService.compareSimulations(initialSimResults.map(({ topologyPoint, simResult }) => ({ topologyPoint, simResult })));
        let bestWin = lastBatchComparison.top5Wins.length > 0 ? lastBatchComparison.top5Wins[0] : null;
        let bestLoss = lastBatchComparison.top5Losses.length > 0 ? lastBatchComparison.top5Losses[0] : null;

        let notableResultPointsToTry: TopologyPoint[] = [];
        for (let i = 0; i < 5; i++) {
            if (lastBatchComparison.top5Wins.length > i) {
                notableResultPointsToTry.push(lastBatchComparison.top5Wins[i].topologyPoint);
            }

            if (lastBatchComparison.top5Losses.length > i) {
                notableResultPointsToTry.push(lastBatchComparison.top5Losses[i].topologyPoint);
            }
        }

        let interestedInLosses = true;
        let bestLossImprovedThisIteration = false;
        
        while (notableResultPointsToTry.length > 0) {
            simulation.progressText.set(`Refinement Pass ${ refinementPass }`);
            refinementPass++;

            const untestedMutatedTopologyPoints = this.tryMutatePoints(simulationsRanHashmap, notableResultPointsToTry, humanArmyDef);

            if (untestedMutatedTopologyPoints.length === 0) {
                break;
            }
            
            notableResultPointsToTry = [];
            const refinementResults = await workerManager.runBatchedWork(untestedMutatedTopologyPoints.map(sim => ({ sim, humanArmyDef, enemyArmyDef })));      
            const refinementComparison = SimulationComparisonService.getInstance().compareSimulations(refinementResults.map(({ topologyPoint, simResult }) => ({ topologyPoint, simResult })));
            
            if (refinementComparison.top5Wins.length > 0 && (!bestWin || (refinementComparison.top5Wins[0].simResult.weightedWinScore < bestWin.simResult.weightedWinScore))) {
                bestWin = refinementComparison.top5Wins[0];
                notableResultPointsToTry.push(refinementComparison.top5Wins[0].topologyPoint);
            }

            if (refinementComparison.top5Losses.length > 0 && (!bestLoss || (refinementComparison.top5Losses[0].simResult.weightedLossScore > bestLoss.simResult.weightedLossScore))) {
                bestLoss = refinementComparison.top5Losses[0];
                bestLossImprovedThisIteration = true;
            }
            else {
                bestLossImprovedThisIteration = false;
            }

            interestedInLosses = (!bestWin || (bestLoss && bestWin.simResult.weightedLossScore < bestLoss.simResult.weightedLossScore * 0.75)) ? true : false;
            if (interestedInLosses && bestLossImprovedThisIteration) {
                notableResultPointsToTry.push(refinementComparison.top5Losses[0].topologyPoint);
            }
        }

        simulation.bestWinResult = bestWin?.simResult;
        
        if (interestedInLosses) {
            simulation.bestLossResult = bestLoss?.simResult;
        }

        workerManager.destroy();
    }


    private tryMutatePoints(simulationsRan: Set<string>, points: TopologyPoint[], armyDef: ArmyDefinition): TopologyPoint[] {
        const toRun: TopologyPoint[] = [];

        for (const point of points) {
            const mutatedPoints = this.unitTopologyService.mutatePoint(point, armyDef);
            
            for (const mutatedPoint of mutatedPoints) {
                const mutatedPointKey = this.unitTopologyService.getTopologyPointHashCode(mutatedPoint);

                if (!simulationsRan.has(mutatedPointKey)) {
                    toRun.push(mutatedPoint);
                    simulationsRan.add(mutatedPointKey);
                }
            }
        }
        
        return toRun;
    }
}