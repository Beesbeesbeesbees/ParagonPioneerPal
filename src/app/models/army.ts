import { UnitBlock } from "./unit-block";
import { UnitInfo } from "./unitTypes";

export class Army {
    unitBlocksByNormalOrder: UnitBlock[];
    unitBlocksByFlankingOrder: UnitBlock[];

    normalTargetingUnitBlockIndexHashCodePointer: number;
    normalTargetingUnitBlockIndexHashCodeLength: number;

    flankingTargetingUnitBlockIndexHashCodePointer: number;
    flankingTargetingUnitBlockIndexHashCodeLength: number;

    hashCodeLength: number;

    constructor(orderedUnitBlocks: UnitBlock[]) {
        this.unitBlocksByNormalOrder = orderedUnitBlocks;

        let hashCodeLength = 0;
        for (const block of this.unitBlocksByNormalOrder) {
            const totalHp = block.unitType.maxHp * block.unitCount;
            const totalHpLength = totalHp.toString(36).length;

            block.hashCodeCurrentHpPointer = hashCodeLength;
            block.hashCodeCurrentHpLength = totalHpLength;

            hashCodeLength += totalHpLength;
            
            const unitsAliveAtTopOfRound = block.unitCount;
            const unitsAliveAtTopOfRoundLength = unitsAliveAtTopOfRound.toString(36).length;

            block.hashCodeUnitsAliveAtTopOfRoundPointer = hashCodeLength;
            block.hashCodeUnitsAliveAtTopOfRoundLength = unitsAliveAtTopOfRoundLength;

            hashCodeLength += unitsAliveAtTopOfRoundLength;

            block.totalHashCodeLength = totalHpLength + unitsAliveAtTopOfRoundLength;
        }

        const unitBlockCountString = this.unitBlocksByNormalOrder.length.toString();
        this.normalTargetingUnitBlockIndexHashCodePointer = hashCodeLength;
        this.normalTargetingUnitBlockIndexHashCodeLength = unitBlockCountString.length;
        hashCodeLength += unitBlockCountString.length;

        this.flankingTargetingUnitBlockIndexHashCodePointer = hashCodeLength;
        this.flankingTargetingUnitBlockIndexHashCodeLength = unitBlockCountString.length;
        hashCodeLength += unitBlockCountString.length;

        this.hashCodeLength = hashCodeLength;

        this.unitBlocksByFlankingOrder = [...this.unitBlocksByNormalOrder]
            .toSorted((a, b) => 
                a.unitType.maxHp !== b.unitType.maxHp ?
                    a.unitType.maxHp - b.unitType.maxHp :
                    a.unitType.order - b.unitType.order);
    }

    getInitialHashCode(): string {
        let hashCode = '';

        for (const block of this.unitBlocksByNormalOrder) {
            const totalHp = block.unitType.maxHp * block.unitCount;
            const totalHpStr = totalHp.toString(36);
            hashCode += totalHpStr;


            const unitsAliveAtTopOfRound = block.unitCount;
            const unitsAliveAtTopOfRoundStr = unitsAliveAtTopOfRound.toString(36);
            hashCode += unitsAliveAtTopOfRoundStr;
        }

        hashCode += String(0).padStart(this.normalTargetingUnitBlockIndexHashCodeLength, '0');
        hashCode += String(0).padStart(this.flankingTargetingUnitBlockIndexHashCodeLength, '0');

        return hashCode;
    }
}

export type ArmyDefinition = { unit: UnitInfo; count: number }[]

export type SimulationInput = {
    availablePlayerArmy: ArmyDefinition;
    enemyArmy: ArmyDefinition;
}