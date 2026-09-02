import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Island } from '../../models/island';
import { ProductType, productIconMap } from '../../models/product';
import { unitInfoByName } from '../../models/unitTypes';
import { IslandService } from '../../services/island-service';

type GlobalProduction = {
  productName: ProductType;
  amount: number;
};

type GlobalUnitCount = {
  unitName: string;
  count: number;
  icon: string;
};

@Component({
  selector: 'global-summary',
  imports: [DecimalPipe],
  templateUrl: './global-summary.component.html',
  styleUrl: './global-summary.component.scss',
})
export class GlobalSummaryComponent {
  @Input()
  islands: Island[] = [];

  @Input()
  isOpen = false;

  @Output()
  close = new EventEmitter<void>();

  productIconMap = productIconMap;
  islandService = IslandService.getInstance();

  get globalProduction(): GlobalProduction[] {
    const totals = new Map<ProductType, number>();

    for (const island of this.islands) {
      for (const production of this.islandService.flattenProduction(island)) {
        totals.set(production.productName, (totals.get(production.productName) ?? 0) + production.productAmount);
      }
    }

    return [...totals.entries()]
      .map(([productName, amount]) => ({ productName, amount }))
      .sort((a, b) => a.productName.localeCompare(b.productName));
  }

  closeModal(): void {
    this.close.emit();
  }

  get globalUnitCounts(): GlobalUnitCount[] {
    const totals = new Map<string, number>();

    for (const island of this.islands) {
      for (const [unitName, count] of Object.entries(island.army)) {
        totals.set(unitName, (totals.get(unitName) ?? 0) + count);
      }
    }

    return [...totals.entries()]
      .map(([unitName, count]) => ({
        unitName,
        count,
        icon: unitInfoByName(unitName).icon,
      }))
      .sort((a, b) => unitInfoByName(a.unitName).uniqueId - unitInfoByName(b.unitName).uniqueId);
  }

  get totalArmyCount(): number {
    return this.globalUnitCounts.reduce((total, unit) => total + unit.count, 0);
  }

  getProductIcon(productName: string): string {
    return productIconMap[productName as ProductType];
  }
}