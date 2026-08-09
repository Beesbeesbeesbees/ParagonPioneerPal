import { ProductType } from "../models/product";
import { ProductionNode } from "../models/production-node";
import { Recipe, recipes } from "../models/recipe";
import { ShipConfigurationStatic } from "../models/ship-trade";

export class ProductionService {
    private static instance: ProductionService;

    recipesByProduct: Map<ProductType, Recipe[]>;

    private constructor() {
        this.recipesByProduct = new Map<ProductType, Recipe[]>();

        for (const recipe of recipes) {
            const existing = this.recipesByProduct.get(recipe.productType);
            if (existing === undefined) {
                this.recipesByProduct.set(recipe.productType, [recipe]);
            }
            else {
                existing.push(recipe);
            }
        }
    }

    static getInstance(): ProductionService {
        if (!ProductionService.instance) {
            ProductionService.instance = new ProductionService();
        }
        return ProductionService.instance;
    }

    createProductionNodeForProduct(product: ProductType, amount: number, fromPopulation: boolean, nodeDepth: number = 0): ProductionNode {
        const recipes = this.recipesByProduct.get(product)!;

        const result: ProductionNode = {
            productName: product,
            nodeDepth: nodeDepth,
            tradeBalance: 0,
            tradeConfiguration: ShipConfigurationStatic.getEmptyShipConfiguration(),
            childNodes: [],
            productAmount: amount,
            buildingsNeeded: 0,
            buildingsConstructed: 0,
            defecit: 0,
            fromPopulation: fromPopulation,
            fieldsDisplay: false,
            selectedRecipe: recipes[0],
            alternateRecipes: recipes.slice(1)
        }

        this.generateChildNodes(result);
        this.recalculateNode(result);
        return result;
    }

    setAmountForNode(productionNode: ProductionNode, newAmount: number) {
        productionNode.productAmount = newAmount;
        this.recalculateNode(productionNode);
    }

    recalculateNode(productionNode: ProductionNode) {
        const amountNeeded = productionNode.productAmount - productionNode.tradeBalance;
        productionNode.buildingsNeeded = Math.max(0, amountNeeded / productionNode.selectedRecipe.productionPerHour / productionNode.selectedRecipe.productAmount);
        
        let currentProduction = productionNode.buildingsConstructed * productionNode.selectedRecipe.productionPerHour * productionNode.selectedRecipe.productAmount;

        if (productionNode.fieldsDisplay) {
            productionNode.buildingsNeeded *= productionNode.selectedRecipe.fieldCount!;
            currentProduction /= productionNode.selectedRecipe.fieldCount!;
        }

        productionNode.defecit = Math.max(0, amountNeeded - currentProduction);

        for (const child of productionNode.childNodes) {
            const childIngredient = productionNode.selectedRecipe.ingredients.find(x => x.ingredientType === child.productName);
            const childProductsNeeded = amountNeeded / productionNode.selectedRecipe.productAmount * childIngredient!.ingredientAmount;
            child.productAmount = Math.max(0, childProductsNeeded);
            this.recalculateNode(child);
        }
    }

    toggleFieldView(productionNode: ProductionNode) {
        productionNode.fieldsDisplay = !productionNode.fieldsDisplay;
        productionNode.buildingsConstructed = productionNode.fieldsDisplay ? productionNode.buildingsConstructed * productionNode.selectedRecipe.fieldCount! : productionNode.buildingsConstructed / productionNode.selectedRecipe.fieldCount!;
        this.recalculateNode(productionNode);
    }

    toggleRecipe(productionNode: ProductionNode) {
        productionNode.alternateRecipes.push(productionNode.selectedRecipe);
        productionNode.selectedRecipe = productionNode.alternateRecipes.splice(0, 1)[0];
        productionNode.childNodes = [];
        this.generateChildNodes(productionNode);
        this.recalculateNode(productionNode);
    }

    private generateChildNodes(node: ProductionNode) {
        for (const ingredient of node.selectedRecipe.ingredients) {
            node.childNodes.push(this.createProductionNodeForProduct(ingredient.ingredientType, ingredient.ingredientAmount, node.fromPopulation, node.nodeDepth + 1));
        }
    }
}