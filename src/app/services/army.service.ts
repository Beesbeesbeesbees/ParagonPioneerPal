import { Army, ArmyDefinition } from '../models/army';
import { unitInfoByName } from '../models/unitTypes';
import { UnitBlock } from '../models/unit-block';

export class ArmyService {
    private static instance: ArmyService;

    private constructor() {}

    static getInstance(): ArmyService {
        if (!ArmyService.instance) {
            ArmyService.instance = new ArmyService();
        }
        return ArmyService.instance;
    }

    constructArmy(armyDefinition: ArmyDefinition): Army {
        const unsortedUnitBlocks: UnitBlock[] = [];
        
        for (const blockDef of armyDefinition) {
            if (blockDef.count > 0) {
                unsortedUnitBlocks.push(new UnitBlock(unitInfoByName(blockDef.unit.name), blockDef.count));
            }
        }

        const orderedUnitBlocks = unsortedUnitBlocks.length <= 1 
            ? unsortedUnitBlocks 
            : unsortedUnitBlocks.sort((a, b) => a.unitType.order - b.unitType.order);

        return new Army(orderedUnitBlocks);
    }
}