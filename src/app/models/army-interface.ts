export type HumanArmyInterface = {
    [key: string]: number;
    "Militia": number;
    "Archer": number;
    "Footsoldier": number;
    "Longbow Archer": number;
    "Knight": number;
    "Crossbowman": number;
    "Cavalry": number;
    "Cuirassier": number;
    "Cannoneer": number;
}

export type EnemyArmyInterface = {
    [key: string]: number;
    "Orkling": number;
    "Orc Hunter": number;
    "Orc Raiders": number;
    "Elite Orc Hunters": number;
    "Orc Veteran": number;
    "Elite Orc Sniper": number;
    "Warg Rider": number;
    "Orc Vanguard": number;
    "Orc Demolisher": number;
    "Bula (boss 1)": number;
    "Aguk (boss 2)": number;
    "Mazoga (boss 3)": number;
    "Durgash (boss 4)": number;
}

export class ArmyInterfaces {
    static getEmptyHumanArmyCount(): HumanArmyInterface {
        return {
            "Militia": 0,
            "Archer": 0,
            "Footsoldier": 0,
            "Longbow Archer": 0,
            "Knight": 0,
            "Crossbowman": 0,
            "Cavalry": 0,
            "Cuirassier": 0,
            "Cannoneer": 0
        };
    }

    static getEmptyOrcArmyCount(): EnemyArmyInterface {
        return {
            "Orkling": 0,
            "Orc Hunter": 0,
            "Orc Raiders": 0,
            "Elite Orc Hunters": 0,
            "Orc Veteran": 0,
            "Elite Orc Sniper": 0,
            "Warg Rider": 0,
            "Orc Vanguard": 0,
            "Orc Demolisher": 0,
            "Bula (boss 1)": 0,
            "Aguk (boss 2)": 0,
            "Mazoga (boss 3)": 0,
            "Durgash (boss 4)": 0
        };
    }

    static getDefaultHumanValues(): HumanArmyInterface {
        return {
            "Militia": 0.5,
            "Archer": 1,
            "Footsoldier": 1,
            "Longbow Archer": 2,
            "Knight": 4,
            "Crossbowman": 4,
            "Cavalry": 2,
            "Cuirassier": 8,
            "Cannoneer": 16
        };
    }

    static getDefaultOrcValues(): EnemyArmyInterface {
        return {
            "Orkling": 1,
            "Orc Hunter": 1,
            "Orc Raiders": 1,
            "Elite Orc Hunters": 2,
            "Orc Veteran": 4,
            "Elite Orc Sniper": 4,
            "Warg Rider": 2,
            "Orc Vanguard": 8,
            "Orc Demolisher": 16,
            "Bula (boss 1)": 1000,
            "Aguk (boss 2)": 1000,
            "Mazoga (boss 3)": 1000,
            "Durgash (boss 4)": 1000
        };
    }
}