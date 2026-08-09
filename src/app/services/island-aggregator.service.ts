import { Island } from "../models/island";
import { ProductType } from "../models/product";
import { ProductionNode } from "../models/production-node";

export class IslandAggregatorService {
    private static instance: IslandAggregatorService;

    private constructor() {}

    static getInstance(): IslandAggregatorService {
        if (!IslandAggregatorService.instance) {
            IslandAggregatorService.instance = new IslandAggregatorService();
        }
        return IslandAggregatorService.instance;
    }

    private buildingsConstructedAggregates: Map<Island, Map<string, number>> = new Map();

    updateAllIslands(islands: Island[]) {
        for (const island of islands) {
            this.updateIsland(island);
        }
    }

    updateIsland(island: Island) {
        const result = new Map();
        this.buildingsConstructedAggregates.set(island, result);

        const aggregateFn = (node: ProductionNode, map: Map<string, number>) => {
            const constructedNormalized = node.fieldsDisplay ? node.buildingsConstructed / node.selectedRecipe.fieldCount! : node.buildingsConstructed;
            map.set(node.selectedRecipe.name, (map.get(node.selectedRecipe.name) || 0) + constructedNormalized);

            for (const child of node.childNodes) {
                aggregateFn(child, map);
            }
        }

        for (const node of island.production) {
            aggregateFn(node, result)
        }
    }

    getBuildingsConstructed(buildingName: string, island: Island): number {
        return this.buildingsConstructedAggregates.get(island)?.get(buildingName) || 0;
    }
}