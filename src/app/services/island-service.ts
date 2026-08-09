import { ArmyInterfaces } from "../models/army-interface";
import { Island } from "../models/island";
import { populations, PopulationType } from "../models/population";
import { ProductType } from "../models/product";
import { ProductionNode } from "../models/production-node";
import { ProductionService } from "./production.service";
import { SaveService } from "./save.service";

export class IslandService {
    private static instance: IslandService;

    private constructor() {
        this.productionService = ProductionService.getInstance();
    }

    static getInstance(): IslandService {
        if (!IslandService.instance) {
            IslandService.instance = new IslandService();
        }
        return IslandService.instance;
    }

    private productionService: ProductionService;

    addPopulation(island: Island) {
        island.population = {
            Pioneer: 0,
            Colonist: 0,
            Townsmen: 0,
            Merchant: 0,
            Paragon: 0
        };
    }

    removePopulation(island: Island) {
        island.population = null;
    }

    getDefaultIsland(): Island {
        return {
            name: 'New Island',
            population: null,
            isMinimized: false,
            army: ArmyInterfaces.getEmptyHumanArmyCount(),
            production: [],
        };
    }

    onPopulationUpdate(island: Island, populationType: PopulationType, event: number) {
        if (island.population === null) {
            return;
        }
        
        island.population[populationType] = event;

        const totalNeedMap = new Map<ProductType, number>();

        for (const [populationType, populationNumber] of Object.entries(island.population) as [PopulationType, number][]) {
            const needs = populations.get(populationType)!.needs;
            for (const need of needs) {
                const existingNeed = totalNeedMap.get(need.needType) || 0;
                totalNeedMap.set(need.needType, existingNeed + need.needAmount * populationNumber);
            }
        }

        for (const [needType, needAmount] of totalNeedMap) {
            const existingNeed = island.production.find(x => x.productName === needType && x.fromPopulation === true);
            if (existingNeed === undefined && needAmount > 0) {
                const newProduction = this.productionService.createProductionNodeForProduct(needType, needAmount, true);
                island.production.push(newProduction);
            }
            else if (existingNeed !== undefined) {
                this.productionService.setAmountForNode(existingNeed, needAmount);
            }
        }
    }

    removeProduction(production: ProductionNode, island: Island) {
        island.production.splice(island.production.indexOf(production), 1);
    }

    flattenProduction(island: Island): ProductionNode[] {
        const result: ProductionNode[] = [];

        const addFn = (list: ProductionNode[], node: ProductionNode) => {
            list.push(node);
            for (const child of node.childNodes) {
                addFn(list, child);
            }
        }

        for (const node of island.production) {
            addFn(result, node);
        }

        return result;
    }
}