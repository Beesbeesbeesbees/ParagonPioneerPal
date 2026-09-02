import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustodianOptionsComponent } from '../custodian-options/custodian-options.component';
import { SimulationOptionsComponent } from '../simulation-options/simulation-options.component';

@Component({
  selector: 'global-settings',
  imports: [SimulationOptionsComponent, CustodianOptionsComponent],
  templateUrl: './global-settings.component.html',
  styleUrl: './global-settings.component.scss',
})
export class GlobalSettingsComponent {
  @Input()
  isOpen = false;

  @Output()
  close = new EventEmitter<void>();

  @Output()
  onUpdate: EventEmitter<void> = new EventEmitter();

  closeModal(): void {
    this.close.emit();
  }
}
