import { WritableSignal } from "@angular/core";
import { ArmyDefinition } from "./army"
import { SimulationResultAggregated } from "./simulation-result";

export type Simulation = {
    humanArmyDef: ArmyDefinition;
    enemyArmyDef: ArmyDefinition;

    progressNumerator: WritableSignal<number | null>;
    progressDenominator: WritableSignal<number | null>;
    progressText: WritableSignal<string>;

    bestWinResult: SimulationResultAggregated | undefined;
    bestLossResult: SimulationResultAggregated | undefined;

    isStarted: boolean;
    isInvalid: boolean;
}