/// <reference lib="webworker" />

import { ArmyDefinition } from "../models/army";
import { SimulationSettings } from "../models/simulation-settings";
import { BattleSimulationService } from "../services/battle-simulation.service";

addEventListener('message', ({ data }) => {    
    const humanArmySim = data.humanArmySim as ArmyDefinition;
    const enemyArmyDef = data.enemyArmyDef as ArmyDefinition;
    const settings = data.settings as SimulationSettings;
    const service = BattleSimulationService.getInstance();

    const result = service.simulate(humanArmySim, enemyArmyDef, settings);        

    postMessage(result);
});
