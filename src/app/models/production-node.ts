import { ProductType } from "./product";
import { Recipe } from "./recipe";
import { ShipConfiguration } from "./ship-trade";

export type ProductionNode = {
    productName: ProductType;
    childNodes: ProductionNode[];
    nodeDepth: number;

    productAmount: number;
    tradeBalance: number;
    tradeConfiguration: ShipConfiguration;
    buildingsNeeded: number;
    buildingsConstructed: number;
    defecit: number;

    fromPopulation: boolean;
    fieldsDisplay: boolean;
    selectedRecipe: Recipe;
    alternateRecipes: Recipe[];
}