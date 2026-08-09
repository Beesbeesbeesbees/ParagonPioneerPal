import { Island } from "../models/island";
import { ProductType } from "../models/product";
import { ProductionNode } from "../models/production-node";

export class TradeService {
    private static instance: TradeService;

    private productMap: Map<ProductType, number> = new Map();

    private constructor() {}

    static getInstance(): TradeService {
        if (!TradeService.instance) {
            TradeService.instance = new TradeService();
        }
        return TradeService.instance;
    }

    getProductTradeBalance(productType: ProductType) {
        return this.productMap.get(productType) || 0;
    }

    calculateTradeBalance(islands: Island[]) {
        this.productMap = new Map();
        const sumFn = (map: Map<ProductType, number>, product: ProductionNode) => {
            map.set(product.productName, (map.get(product.productName) || 0) + product.tradeBalance);
            for (const child of product.childNodes) {
                sumFn(map, child);
            }
        }

        for (const island of islands) {
            for (const product of island.production) {
                sumFn(this.productMap, product);
            }
        }
    }
}