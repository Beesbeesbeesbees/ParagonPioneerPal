import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SimulationSettingsService } from '../../services/simulation-settings.service';

@Component({
  selector: 'custodian-options',
  imports: [FormsModule],
  templateUrl: './custodian-options.component.html',
  styleUrl: './custodian-options.component.scss',
})
export class CustodianOptionsComponent {
  @Output()
  onUpdate: EventEmitter<void> = new EventEmitter();

  settings = SimulationSettingsService.getInstance().settings;
}