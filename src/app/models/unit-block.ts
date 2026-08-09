import { UnitInfo } from "./unitTypes";

export class UnitBlock {
    unitType: UnitInfo;
    unitCount: number;

    hashCodeCurrentHpPointer: number;
    hashCodeCurrentHpLength: number;

    hashCodeUnitsAliveAtTopOfRoundPointer: number;
    hashCodeUnitsAliveAtTopOfRoundLength: number;

    totalHashCodeLength: number;
    

    constructor(unitType: UnitInfo, unitCount: number) {
        this.unitType = unitType;
        this.unitCount = unitCount;

        this.hashCodeCurrentHpPointer = 0;
        this.hashCodeCurrentHpLength = 0;
        
        this.hashCodeUnitsAliveAtTopOfRoundPointer = 0;
        this.hashCodeUnitsAliveAtTopOfRoundLength = 0;

        this.totalHashCodeLength = 0;
    }
}