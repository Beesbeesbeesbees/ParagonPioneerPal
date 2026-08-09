import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ArmyInterfaces, EnemyArmyInterface, HumanArmyInterface } from '../models/army-interface';
import { UnitInfo, unitInfoByName } from '../models/unitTypes';
import { DecimalPipe, KeyValue, KeyValuePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArmyDefinition } from '../models/army';
import { SimulationManagerService } from '../services/simulation-manager.service';
import { Simulation } from '../models/simulation';
import { SimulationSettingsService } from '../services/simulation-settings.service';
import { SelectInputTextDirective } from '../widgets/select-input-text/select-input-text.directive';

@Component({
  selector: 'battle-calculator',
  imports: [KeyValuePipe, DecimalPipe, FormsModule, SelectInputTextDirective],
  templateUrl: './battle-calculator.component.html',
  styleUrl: './battle-calculator.component.scss',
})
export class BattleCalculatorComponent {

  @Input()
  playerUnitsAvailableInterface: HumanArmyInterface = ArmyInterfaces.getEmptyHumanArmyCount();

  @Output()
  onClose: EventEmitter<void> = new EventEmitter();

  @Output()
  onUpdate: EventEmitter<void> = new EventEmitter();

  enemyCountInterface: EnemyArmyInterface = ArmyInterfaces.getEmptyOrcArmyCount();
  
  simulationManagerService: SimulationManagerService;
  simulations: Simulation[] = [];
  simulationIsRunning: boolean = false;
  math: Math = Math;
  
  simulationSettingsService: SimulationSettingsService;
  playerUnitValueInterface: HumanArmyInterface;
  enemyUnitValueInterface: EnemyArmyInterface;

  constructor() {
    this.simulationManagerService = SimulationManagerService.getInstance();
    this.simulationSettingsService = SimulationSettingsService.getInstance();
    this.playerUnitValueInterface = this.simulationSettingsService.settings.playerUnitValueInterface;
    this.enemyUnitValueInterface = this.simulationSettingsService.settings.enemyUnitValueInterface;
  }

  unitSorter = (a: KeyValue<string,number>, b: KeyValue<string,number>) => {
    return unitInfoByName(a.key).uniqueId - unitInfoByName(b.key).uniqueId;
  };

  unitSorterByOrder = (a: KeyValue<string,{ unit: UnitInfo; count: number }>, b: KeyValue<string,{ unit: UnitInfo; count: number }>) => {
    return a.value.unit.order - b.value.unit.order;
  }


  getUnitIconByName(name: string): string {
    const unit = unitInfoByName(name);
    return unit.icon;
  }


  clearEnemyCount(): void {
    this.enemyCountInterface = ArmyInterfaces.getEmptyOrcArmyCount();
  }

  
  clearHumanCount(): void {
    this.playerUnitsAvailableInterface = ArmyInterfaces.getEmptyHumanArmyCount();
  }


  calculate() {
    const humanArmyDef: ArmyDefinition = [];
    const enemyArmyDef: ArmyDefinition = [];

    for (const [unitName, count] of Object.entries(this.playerUnitsAvailableInterface)) {
      if (count > 0) {
        humanArmyDef.push({ unit: unitInfoByName(unitName), count });
      }
    }

    for (const [unitName, count] of Object.entries(this.enemyCountInterface)) {
      if (count > 0) {
        enemyArmyDef.push({ unit: unitInfoByName(unitName), count });
      }
    }

    const simulation = this.simulationManagerService.createSimulation(humanArmyDef, enemyArmyDef);
    this.simulations.push(simulation);
    this.runNextSimulationIfPossible();
    this.clearEnemyCount();
  }

  onSimulationComplete() {
    this.refreshSimulationValidity();
    this.runNextSimulationIfPossible();
  }

  deleteSimulation(simulation: Simulation) {
    const index = this.simulations.indexOf(simulation);
    if (index > -1) {
      this.simulations.splice(index, 1);
    }
  }

  runNextSimulationIfPossible() {
    if (!this.simulationIsRunning) {
      const toRun = this.simulations.find(x => !x.isStarted);
      if (toRun) {
        this.simulationIsRunning = true;
        this.simulationManagerService.runSimulation(toRun)
          .then(() => {
            this.simulationIsRunning = false;
            this.onSimulationComplete();
        });
      }
    }
  }

  recalculateSimulation(simulation: Simulation) {
    const humanArmyDef: ArmyDefinition = [];

    for (const [unitName, count] of Object.entries(this.playerUnitsAvailableInterface)) {
      if (count > 0) {
        humanArmyDef.push({ unit: unitInfoByName(unitName), count });
      }
    }
    
    simulation.humanArmyDef = humanArmyDef;
    simulation.progressText.set("Queued");
    simulation.progressNumerator.set(null);
    simulation.progressDenominator.set(null);
    simulation.isStarted = false;
    simulation.isInvalid = false;
    simulation.bestLossResult = undefined;
    simulation.bestWinResult = undefined;
    this.runNextSimulationIfPossible();
  }

  acceptSimulation(simulation: Simulation, win: boolean) {
    const simResult = win ? simulation.bestWinResult : simulation.bestLossResult;

    for (const unit of simResult!.playerArmy) {
      this.playerUnitsAvailableInterface[unit.unit.name] -= unit.count;
    }

    this.deleteSimulation(simulation);
    this.refreshSimulationValidity();
  }

  refreshSimulationValidity() {
    for (const sim of this.simulations) {
      sim.isInvalid = false;

      if (sim.bestWinResult) {
        for (const simInput of sim.bestWinResult.playerArmy) {
          const matchedAvailableUnitCount = this.playerUnitsAvailableInterface[simInput.unit.name];
          if (simInput.count > matchedAvailableUnitCount) {
            sim.isInvalid = true;
          }
        }
      }

      if (sim.bestLossResult) {
        for (const simInput of sim.bestLossResult.playerArmy) {
          const matchedAvailableUnitCount = this.playerUnitsAvailableInterface[simInput.unit.name];
          if (simInput.count > matchedAvailableUnitCount) {
            sim.isInvalid = true;
          }
        }
      }
    }
  }

  canCalculate(): boolean {
    return this.playerUnitsAvailableInterface && Object.values(this.playerUnitsAvailableInterface).some(count => count > 0) &&
           this.enemyCountInterface && Object.values(this.enemyCountInterface).some(count => count > 0);
  }
}