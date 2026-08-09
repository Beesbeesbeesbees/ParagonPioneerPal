import { signal, WritableSignal } from "@angular/core";
import { ArmyDefinition } from "../models/army";
import { SimulationResult, SimulationResultAggregated } from "../models/simulation-result";
import { TopologyPoint } from "../services/unit-topology.service";
import { SimulationSettingsService } from "../services/simulation-settings.service";

export class WebWorkerManager {
    workers: Worker[];
    settingsService: SimulationSettingsService;
    statusSignalNumerator: WritableSignal<number | null>;
    statusSignalDenominator: WritableSignal<number | null>;

    constructor() {
        this.settingsService = SimulationSettingsService.getInstance();
        const threadCount = Math.min((this.settingsService.settings.maxThreads ?? Infinity),  Math.max(1, (navigator.hardwareConcurrency || 4) - 1));
        this.workers = [];
        this.statusSignalNumerator = signal(null);
        this.statusSignalDenominator = signal(null);

        for (let i = 0; i < threadCount; i++) {
            const worker = new Worker(new URL('../workers/battle-simulation.worker', import.meta.url));
            this.workers.push(worker);
        }
    }


    runBatchedWork(tasks: { sim: TopologyPoint, humanArmyDef: ArmyDefinition, enemyArmyDef: ArmyDefinition }[]): Promise<{ topologyPoint: TopologyPoint, simResult: SimulationResultAggregated }[]> {
        const taskCount = tasks.length;
        const taskResults: { topologyPoint: TopologyPoint, simResult: SimulationResultAggregated }[] = [];
        
        return new Promise<{ topologyPoint: TopologyPoint, simResult: SimulationResultAggregated }[]>((resolve) => { 
            for (const worker of this.workers) {
                const task = tasks.pop();

                if (task) {
                    const workerCallback = (sim: TopologyPoint, simResult: SimulationResult, worker: Worker) => {
                        const aggregatedSimResult = new SimulationResultAggregated(simResult);
                        taskResults.push({ topologyPoint: sim, simResult: aggregatedSimResult });

                        this.statusSignalNumerator.set(taskResults.length);
                        this.statusSignalDenominator.set(taskCount);
                        
                        const nextTask = tasks.pop();
                        if (nextTask) {
                            worker.onmessage = ({data}) => workerCallback(nextTask.sim,data, worker);
                            this.postTaskToWorker(worker, nextTask.sim, nextTask.humanArmyDef, nextTask.enemyArmyDef);
                        }
                        else if (taskResults.length === taskCount) {
                            resolve(taskResults);
                        }
                    };

                    worker.onmessage = ({data}) => workerCallback(task.sim, data, worker);

                    this.postTaskToWorker(worker, task.sim, task.humanArmyDef, task.enemyArmyDef);
                }
            }
        });
    }

    destroy() {
        for (const worker of this.workers) {
            worker.terminate();
        }
        this.workers = [];
    }

    private postTaskToWorker (worker: Worker, sim: TopologyPoint, humanArmyDef: ArmyDefinition, enemyArmyDef: ArmyDefinition) {
        const humanArmySim: ArmyDefinition = [];
        for (let i = 0; i < sim.length; i++) {
            humanArmySim.push({ unit: humanArmyDef[i].unit, count: sim[i] });
        }

        const payload = { humanArmySim, enemyArmyDef, settings: this.settingsService.settings };
        worker.postMessage(payload);
    };
}