import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SimulationSettingsService } from '../../services/simulation-settings.service';

@Component({
  selector: 'simulation-options',
  imports: [FormsModule],
  templateUrl: './simulation-options.component.html',
  styleUrl: './simulation-options.component.scss',
})
export class SimulationOptionsComponent {
  @Output()
  onUpdate: EventEmitter<void> = new EventEmitter();

  simulationSettingsService = SimulationSettingsService.getInstance();
}
