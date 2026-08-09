import CogIcon from '../assets/png/ships/Cog.png'
import CaravelIcon from '../assets/png/ships/Caravel.png'
import HulkIcon from '../assets/png/ships/Hulk.png'
import PinnaceIcon from '../assets/png/ships/Pinnace.png'
import GalleonIcon from '../assets/png/ships/Galleon.png'
import ClipperIcon from '../assets/png/ships/Clipper.png'
import SchoonerIcon from '../assets/png/ships/Schooner.png'
import WindjammerIcon from '../assets/png/ships/Windjammer.png'
import BluePearlIcon from '../assets/png/ships/Blue Pearl.png'

export type ShipTrade = {
    shipName: ShipType;
    shipIcon: string;
    tradeCapacity: number;
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

    static getShipCapacity(shipType: ShipType) {
        return tradeShips[shipType].tradeCapacity;
    }
}


export const tradeShips = {
    "Cog": {
        shipName: "Cog",
        shipIcon: CogIcon,
        tradeCapacity: 28.8
    },
    "Caravel": {
        shipName: "Caravel",
        shipIcon: CaravelIcon,
        tradeCapacity: 41.5
    },
    "Hulk": {
        shipName: "Hulk",
        shipIcon: HulkIcon,
        tradeCapacity: 86.4
    },
    "Pinnace": {
        shipName: "Pinnace",
        shipIcon: PinnaceIcon,
        tradeCapacity: 120
    },
    "Galleon": {
        shipName: "Galleon",
        shipIcon: GalleonIcon,
        tradeCapacity: 259.2
    },
    "Clipper": {
        shipName: "Clipper",
        shipIcon: ClipperIcon,
        tradeCapacity: 342.9
    },
    "Schooner": {
        shipName: "Schooner",
        shipIcon: SchoonerIcon,
        tradeCapacity: 777.6
    },
    "Windjammer": {
        shipName: "Windjammer",
        shipIcon: WindjammerIcon,
        tradeCapacity: 1034.5
    },
    "Blue Pearl": {
        shipName: "Blue Pearl",
        shipIcon: BluePearlIcon,
        tradeCapacity: 9000
    }
};