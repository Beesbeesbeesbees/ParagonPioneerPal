import CogIcon from '../assets/png/ships/Cog.png'
import CaravelIcon from '../assets/png/ships/Caravel.png'
import HulkIcon from '../assets/png/ships/Hulk.png'
import PinnaceIcon from '../assets/png/ships/Pinnace.png'
import GalleonIcon from '../assets/png/ships/Galleon.png'
import ClipperIcon from '../assets/png/ships/Clipper.png'
import SchoonerIcon from '../assets/png/ships/Schooner.png'
import WindjammerIcon from '../assets/png/ships/Windjammer.png'
import BluePearlIcon from '../assets/png/ships/Blue Pearl.png'
import { SimulationSettingsService } from '../services/simulation-settings.service'

export type ShipTrade = {
    shipName: ShipType;
    shipIcon: string;
    slots: number;
    slotSize: number;
    speedPercent: number;
}

export type ShipType = "Cog" | "Caravel" | "Hulk" | "Pinnace" | "Galleon" | "Clipper" | "Schooner" | "Windjammer" | "Blue Pearl";

export type ShipConfiguration = { [shipType in ShipType]: number }

export class ShipConfigurationStatic {
    static getEmptyShipConfiguration() {
        return {
            "Cog": 0,
            "Caravel": 0,
            "Hulk": 0,
            "Pinnace": 0,
            "Galleon": 0,
            "Clipper": 0,
            "Schooner": 0,
            "Windjammer": 0,
            "Blue Pearl": 0
        };
    }

    static getShipIcon(shipType: ShipType) {
        return tradeShips[shipType].shipIcon;
    }

    static getShipCapacity(shipType: ShipType): number {
        const settings = SimulationSettingsService.getInstance().settings;
        const shipDef = tradeShips[shipType];

        const travelSpeed = settings.navigatorCustodianEnabled ? shipDef.speedPercent * 2 : shipDef.speedPercent;
        const capacity = shipDef.slots * shipDef.slotSize * (settings.smugglerCustodianEnabled ? 2 : 1);

        const roundTripMinutes = 240 / travelSpeed * 100 + 10;
        return capacity / roundTripMinutes * 60;
    }
}


export const tradeShips: { [key in ShipType]: ShipTrade } = {
    "Cog": {
        shipName: "Cog",
        shipIcon: CogIcon,
        slots: 2,
        slotSize: 60,
        speedPercent: 100,
    },
    "Caravel": {
        shipName: "Caravel",
        shipIcon: CaravelIcon,
        slots: 2,
        slotSize: 45,
        speedPercent: 200,
    },
    "Hulk": {
        shipName: "Hulk",
        shipIcon: HulkIcon,
        slots: 4,
        slotSize: 90,
        speedPercent: 100,
    },
    "Pinnace": {
        shipName: "Pinnace",
        shipIcon: PinnaceIcon,
        slots: 3,
        slotSize: 60,
        speedPercent: 300,
    },
    "Galleon": {
        shipName: "Galleon",
        shipIcon: GalleonIcon,
        slots: 6,
        slotSize: 180,
        speedPercent: 100,
    },
    "Clipper": {
        shipName: "Clipper",
        shipIcon: ClipperIcon,
        slots: 4,
        slotSize: 100,
        speedPercent: 400,
    },
    "Schooner": {
        shipName: "Schooner",
        shipIcon: SchoonerIcon,
        slots: 6,
        slotSize: 540,
        speedPercent: 100,
    },
    "Windjammer": {
        shipName: "Windjammer",
        shipIcon: WindjammerIcon,
        slots: 5,
        slotSize: 200,
        speedPercent: 500,
    },
    "Blue Pearl": {
        shipName: "Blue Pearl",
        shipIcon: BluePearlIcon,
        slots: 6,
        slotSize: 1000,
        speedPercent: 800,
    }
};