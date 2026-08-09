import { ArmyDefinition } from "./army";
import { ArmyInterfaces, HumanArmyInterface } from "./army-interface";
import { PopulationType } from "./population";
import { ProductionNode } from "./production-node";

export type Island = {
    name: string;
    population: { [populationType in PopulationType]: number } | null;
    army: HumanArmyInterface;
    production: ProductionNode[];
    isMinimized: boolean;
}
