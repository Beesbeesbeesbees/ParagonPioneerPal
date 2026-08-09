import { DecimalPipe } from "@angular/common";
import { Component, signal, WritableSignal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BattleCalculatorComponent } from "../battle-calculator/battle-calculator.component";
import { Island } from "../models/island";
import { populations, PopulationType } from "../models/population";
import { SaveService } from "../services/save.service";
import { IslandService } from "../services/island-service";
import { productIconMap } from "../models/product";
import { recipeIconMap, Recipe, recipes } from "../models/recipe";
import { ProductionNode } from "../models/production-node";
import { ProductionService } from "../services/production.service";
import { TradeService } from "../services/trade.service";
import { ShipManagementComponent } from "../ship-management/ship-management.component";
import { GlobalSummaryComponent } from "../global-summary/global-summary.component";
import { IslandAggregatorService } from "../services/island-aggregator.service";
import { DeleteWithConfirmationComponent } from "../widgets/delete-with-confirmation/delete-with-confirmation.component";
import { SelectInputTextDirective } from "../widgets/select-input-text/select-input-text.directive";

@Component({
  selector: 'app-main',
  imports: [BattleCalculatorComponent, ShipManagementComponent, GlobalSummaryComponent, FormsModule, DecimalPipe, DeleteWithConfirmationComponent, SelectInputTextDirective],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  islands: WritableSignal<Island[]>;
  populationTypes: PopulationType[] = ['Pioneer', 'Colonist', 'Townsmen', 'Merchant', 'Paragon'];

  saveService: SaveService;
  islandService: IslandService;
  productionService: ProductionService;
  tradeService: TradeService;
  islandAggregatorService: IslandAggregatorService;
  openCalculatorIsland: Island | null = null;
  openShipManagementProduction: ProductionNode | null = null;
  globalSummaryOpen = false;
  
  populations = populations;
  productIconMap = productIconMap;
  recipeIconMap = recipeIconMap;
  recipes = recipes;
  productSearchTerm = '';
  productPickerIsland: Island | null = null;

  constructor() {
    this.saveService = SaveService.getInstance()
    this.islandService = IslandService.getInstance();
    this.productionService = ProductionService.getInstance();
    this.tradeService = TradeService.getInstance();
    this.islandAggregatorService = IslandAggregatorService.getInstance();

    
    this.islands = signal([]);
    this.islands.set(this.saveService.loadFromLocalStorageOrDefault() || [this.islandService.getDefaultIsland()]);
    this.initializeSave();
  }

  onUpdate() {
    this.saveService.saveToLocalStorage(this.islands());
  }

  exportSave() {
    this.saveService.exportSave(this.islands());
  }

  initializeSave() {
    this.tradeService.calculateTradeBalance(this.islands());
    this.islandAggregatorService.updateAllIslands(this.islands());
    this.onUpdate();
  }

  importSave() {
    this.saveService.importSave().then(importedIslands => {      
      if (importedIslands !== null) {
        this.islands.set(importedIslands);
        this.initializeSave();
      }
    }).catch(() => {
      window.alert('Unable to import save file.');
    });
  }

  openBattleInterface(island: Island) {
    this.openCalculatorIsland = island;
  }

  closeBattleInterface() {
    this.openCalculatorIsland = null;
  }

  openShipManagement(production: ProductionNode) {
    this.openShipManagementProduction = production;
  }

  closeShipManagement() {
    this.openShipManagementProduction = null;
    this.onUpdate();
  }

  closeGlobalSummary() {
    this.globalSummaryOpen = false;
  }

  get filteredRecipes(): Recipe[] {
    const searchTerm = this.productSearchTerm.trim().toLowerCase();
    if (searchTerm === '') {
      return this.recipes;
    }

    return this.recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(searchTerm) ||
      recipe.productType.toLowerCase().includes(searchTerm)
    );
  }

  toggleProductPicker(island: Island) {
    if (this.productPickerIsland === island) {
      this.closeProductPicker();
      return;
    }

    this.productPickerIsland = island;
    this.productSearchTerm = '';
  }

  closeProductPicker() {
    this.productPickerIsland = null;
    this.productSearchTerm = '';
  }

  addProduct(island: Island, recipe: Recipe) {
    const production = this.productionService.createProductionNodeForProduct(recipe.productType, 0, false);
    island.production.push(production);
    this.closeProductPicker();
    this.onUpdate();
  }

  addIsland() {
    this.islands().push(this.islandService.getDefaultIsland())
    this.onUpdate();
  }

  removeIsland(island: Island) {
    this.islands().splice(this.islands().indexOf(island), 1);
    this.onUpdate();
  }

  moveProduction(island: Island, production: ProductionNode, direction: -1 | 1) {
    const currentIndex = island.production.indexOf(production);
    const targetIndex = currentIndex + direction;

    if (currentIndex < 0 || targetIndex < 0 || targetIndex >= island.production.length) {
      return;
    }

    [island.production[currentIndex], island.production[targetIndex]] = [island.production[targetIndex], island.production[currentIndex]];
    this.onUpdate();
  }
}