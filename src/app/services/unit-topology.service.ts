import { ArmyDefinition } from "../models/army";
import { UnitInfo } from "../models/unitTypes";
import { SimulationSettingsService } from "./simulation-settings.service";

export class UnitTopologyService {
    private static instance: UnitTopologyService;

    private constructor() {}

    static getInstance(): UnitTopologyService {
        if (!UnitTopologyService.instance) {
            UnitTopologyService.instance = new UnitTopologyService();
        }
        return UnitTopologyService.instance;
    }

    generateTopologyWithUpperBounds(armyDef: ArmyDefinition, resultLimit: number): TopologyPoint[] {
        let stepCount = armyDef.length * 2;
        let result: TopologyPoint[] = [];
        do {
            result = this.generateTopology(armyDef, stepCount);
            stepCount++;
        }
        while (result.length > resultLimit);

        return result;
    }

    generateTopology(armyDef: ArmyDefinition, topologySteps: number): TopologyPoint[] {
        const armyLimit = this.getArmyLimit();
        
        const topologyDimensions = armyDef.filter(a => a.count > 0).map((unit) => {
            const result: { steps: number[] } = { steps: [] };
            const maxCount = Math.min(unit.count, armyLimit);
            
            for (let i = 0; i <= maxCount; i += Math.max(Math.min(topologySteps, maxCount - i), 1)) {
                result.steps.push(i);
            }

            return result;
        })

        let startingToplogyPoints: TopologyPoint[] = [];        
        this.recursivelyGeneratePoints(topologyDimensions, startingToplogyPoints, 0);

        return startingToplogyPoints.filter((point) => {            
            const totalValue = point.reduce((sum, coord) => sum + coord, 0);
            return totalValue <= armyLimit && totalValue > 0;
        });
    }

    getTopologyPointHashCode(point: TopologyPoint): string {
        return point.join('|');
    }

    mutatePoint(point: TopologyPoint, armyDef: ArmyDefinition): TopologyPoint[] {
        const mutations = this.recursivelyMutatePoints([point], 0);
        return mutations.filter((point) => {
            for (let i = 0; i < point.length; i++) {
                if (point[i] < 0) {
                    return false;
                }

                if (armyDef[i].count < point[i]) {
                    return false;
                }

                if (this.getArmyLimit() < point[i]) {
                    return false;
                }
            }

            const totalValue = point.reduce((sum, coord) => sum + coord, 0);
            return totalValue <= this.getArmyLimit() && totalValue > 0;
        });
    }

    private recursivelyGeneratePoints(remainingDimensions: { steps: number[] }[], pointCollection: TopologyPoint[], thisDimensionIndex: number) {
        if (remainingDimensions.length === 0) {
            return;
        }

        const thisDimension = remainingDimensions[0];
        if (thisDimensionIndex === 0) {
            for (const step of thisDimension.steps) {
                pointCollection.push([step]);
            }
        }
        else {
            const originalPointCount = pointCollection.length;
            for (let k = 0; k < originalPointCount; k++) {
                const thisDimensionPoint = pointCollection[k];

                for (let i = 0; i < thisDimension.steps.length; i++) {
                    let point: TopologyPoint;
                    if (i === thisDimension.steps.length - 1) {
                        point = thisDimensionPoint;
                    }
                    else {
                        const newPoint = [...thisDimensionPoint];
                        pointCollection.push(newPoint);
                        point = newPoint;
                    }
                                        
                    point.push(thisDimension.steps[i]);
                }
            }
        }

        const newRemainingDimensions = remainingDimensions.slice(1);
        const nextIndex = thisDimensionIndex + 1;

        this.recursivelyGeneratePoints(newRemainingDimensions, pointCollection, nextIndex);
    }

    private recursivelyMutatePoints(points: TopologyPoint[], thisDimensionIndex: number): TopologyPoint[] {
        const mutatedPoints: TopologyPoint[] = [];

        for (const point of points) {    
            for (let i = -1; i <= 1; i++) {
                const copy = [...point];
                copy[thisDimensionIndex] += i;
                mutatedPoints.push(copy);
            }
        }

        if (thisDimensionIndex === points[0].length - 1) {
            return mutatedPoints;
        }
        else {
            return this.recursivelyMutatePoints(mutatedPoints, thisDimensionIndex + 1);
        }
    }

    private getArmyLimit(): number {
        return SimulationSettingsService.getInstance().settings.generalCustodianEnabled ? 150 : 100;
    }
}

export type TopologyPoint = number[];