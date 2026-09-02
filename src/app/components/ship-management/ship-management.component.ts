import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShipConfiguration, ShipConfigurationStatic, ShipType, tradeShips } from '../../models/ship-trade';
import { ProductionNode } from '../../models/production-node';
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'ship-management',
    imports: [FormsModule, DecimalPipe],
    templateUrl: './ship-management.component.html',
    styleUrl: './ship-management.component.scss'
})
export class ShipManagementComponent implements OnInit {
    @Input()
    node!: ProductionNode;

    @Output()
    close = new EventEmitter<void>();

    @Output()
    onUpdate = new EventEmitter<void>();

    totalCapacity: number = 0;
    math = Math;
    getShipCapacity = ShipConfigurationStatic.getShipCapacity;

    readonly shipTypes = Object.keys(tradeShips) as ShipType[];
    readonly shipCatalog = tradeShips;

    ngOnInit(): void {
        this.refreshDisplay();
    }

    getShipCount(shipType: ShipType): number {
        return this.node.tradeConfiguration[shipType] ?? 0;
    }

    setShipCount(shipType: ShipType, count: number): void {
        this.node.tradeConfiguration[shipType] = count;

        this.refreshDisplay();

        this.onUpdate.emit();
    }

    getShipIcon(shipType: ShipType): string {
        return ShipConfigurationStatic.getShipIcon(shipType);
    }

    closeModal(): void {
        this.close.emit();
    }

    private refreshDisplay() {
        this.totalCapacity = 0;
        for (const ship of Object.entries(this.node.tradeConfiguration)) {
            const shipKey = ship[0] as ShipType;
            this.totalCapacity += ship[1] * this.getShipCapacity(shipKey)
        }
    }
}