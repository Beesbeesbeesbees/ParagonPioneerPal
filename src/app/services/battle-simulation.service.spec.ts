import { describe, expect, it } from 'vitest';

import { ArmyInterfaces } from '../models/army-interface';
import { ArmyDefinition } from '../models/army';
import { SimulationSettingDefaults } from '../models/simulation-settings';
import { unitInfoByName } from '../models/unitTypes';
import { BattleSimulationService } from './battle-simulation.service';

describe('BattleSimulationService integration', () => {
  it('simulates the battle', () => {
    const service = BattleSimulationService.getInstance();

    const playerArmyDef: ArmyDefinition = [
      { unit: unitInfoByName('Longbow Archer'), count: 4 },
      { unit: unitInfoByName('Knight'), count: 1 },
      { unit: unitInfoByName('Cavalry'), count: 6 }
    ];

    const enemyArmyDef: ArmyDefinition = [
      { unit: unitInfoByName('Orc Veteran'), count: 3 },
      { unit: unitInfoByName('Orc Demolisher'), count: 1 }
    ];

    const settings = SimulationSettingDefaults.getDefaultSettings(
      ArmyInterfaces.getDefaultHumanValues(),
      ArmyInterfaces.getDefaultOrcValues(),
    );

    const result = service.simulate(playerArmyDef, enemyArmyDef, settings);

    expect (result.results.get('0|0|0|3|1|')?.probability).toBeCloseTo(0.25752352693206076);
  });
});
