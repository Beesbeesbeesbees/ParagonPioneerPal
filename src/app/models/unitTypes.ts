// Credit to https://github.com/parpio-battle/parpio-battle & https://github.com/Galefury/parpio-battle & https://github.com/Dirm2/parpio-battle
import ArcherIcon from '../assets/png/units/Archer.png'
import CannoneerIcon from '../assets/png/units/Cannoneer.png'
import CavalryIcon from '../assets/png/units/Cavalry.png'
import CrossbowArcherIcon from '../assets/png/units/CrossbowArcher.png'
import CuirassierIcon from '../assets/png/units/Cuirassier.png'
import FootsoldierIcon from '../assets/png/units/Footsoldier.png'
import KnightIcon from '../assets/png/units/Knight.png'
import LongbowArcherIcon from '../assets/png/units/LongbowArcher.png'
import MilitiaIcon from '../assets/png/units/Militia.png'
import OrcArcherIcon from '../assets/png/units/OrcArcher.png'
import OrcBoss1Icon from '../assets/png/units/OrcBoss1.png'
import OrcBoss2Icon from '../assets/png/units/OrcBoss2.png'
import OrcBoss3Icon from '../assets/png/units/OrcBoss3.png'
import OrcBoss4Icon from '../assets/png/units/OrcBoss4.png'
import OrcCannoneerIcon from '../assets/png/units/OrcCannoneer.png'
import OrcCavalryIcon from '../assets/png/units/OrcCavalry.png'
import OrcCrossbowArcherIcon from '../assets/png/units/OrcCrossbowArcher.png'
import OrcCuirassierIcon from '../assets/png/units/OrcCuirassier.png'
import OrcFootsoldierIcon from '../assets/png/units/OrcFootsoldier.png'
import OrcKnightIcon from '../assets/png/units/OrcKnight.png'
import OrcLongbowArcherIcon from '../assets/png/units/OrcLongbowArcher.png'
import OrclingIcon from '../assets/png/units/Orcling.png'


export type UnitName = string

export type UnitSkills = {
    firstStrike: boolean,
    ranged: boolean,
    flanking: boolean,
    doubleStrike: boolean,
    trample: boolean,
    lastStrike: boolean,
}

export type UnitInfo = {
    uniqueId: number,
    name: UnitName,
    friendly: boolean,
    maxHp: number,
    attack: number,
    crit: number,
    order: number,
    tier: number,
    skills: UnitSkills,
    icon: string,
    minIslandSize?: number,
    maxIslandSize?: number,
}

export function isBoss(u: UnitInfo): boolean {
    return u.tier >= 25;
}

function skills(s?: Partial<UnitSkills>): UnitSkills {
    return Object.assign({
        firstStrike: false,
        ranged: false,
        flanking: false,
        doubleStrike: false,
        trample: false,
        lastStrike: false,
    }, s ?? {});
}

export const unitInfos: UnitInfo[] = [
    {
        uniqueId: 1,
        name: "Militia",
        friendly: true,
        maxHp: 15,
        attack: 5,
        crit: 0.8,
        order: 0,
        tier: 1,
        skills: skills(),
        icon: MilitiaIcon,
    },
    {
        uniqueId: 2,
        name: "Archer",
        friendly: true,
        maxHp: 10,
        attack: 20,
        crit: 0.8,
        order: 5,
        tier: 1,
        skills: skills({ ranged: true }),
        icon: ArcherIcon,
    },
    {
        uniqueId: 3,
        name: "Footsoldier",
        friendly: true,
        maxHp: 40,
        attack: 15,
        crit: 0.8,
        order: 1,
        tier: 1,
        skills: skills(),
        icon: FootsoldierIcon,
    },
    {
        uniqueId: 4,
        name: "Cavalry",
        friendly: true,
        maxHp: 5,
        attack: 5,
        crit: 0.8,
        order: 4,
        tier: 2,
        skills: skills({ flanking: true, firstStrike: true }),
        icon: CavalryIcon,
    },
    {
        uniqueId: 5,
        name: "Longbow Archer",
        friendly: true,
        maxHp: 10,
        attack: 15,
        crit: 0.8,
        order: 6,
        tier: 2,
        skills: skills({ ranged: true, doubleStrike: true }),
        icon: LongbowArcherIcon,
    },
    {
        uniqueId: 6,
        name: "Knight",
        friendly: true,
        maxHp: 90,
        attack: 20,
        crit: 0.8,
        order: 2,
        tier: 3,
        skills: skills(),
        icon: KnightIcon,
    },
    {
        uniqueId: 7,
        name: "Crossbowman",
        friendly: true,
        maxHp: 15,
        attack: 90,
        crit: 0.8,
        order: 7,
        tier: 3,
        skills: skills({ ranged: true }),
        icon: CrossbowArcherIcon,
    },
    {
        uniqueId: 8,
        name: "Cuirassier",
        friendly: true,
        maxHp: 120,
        attack: 10,
        crit: 0.8,
        order: 3,
        tier: 4,
        skills: skills({ firstStrike: true }),
        icon: CuirassierIcon,
    },
    {
        uniqueId: 9,
        name: "Cannoneer",
        friendly: true,
        maxHp: 60,
        attack: 80,
        crit: 0.8,
        order: 8,
        tier: 4,
        skills: skills({ trample: true, lastStrike: true, ranged: true, flanking: true }),
        icon: CannoneerIcon,
    },
    {
        uniqueId: 10,
        name: "Orkling",
        friendly: false,
        maxHp: 15,
        attack: 5,
        crit: 0.6,
        order: 0,
        tier: 1,
        skills: skills(),
        icon: OrclingIcon,
        minIslandSize: 12,
        maxIslandSize: 14,
    },
    {
        uniqueId: 11,
        name: "Orc Hunter",
        friendly: false,
        maxHp: 10,
        attack: 20,
        crit: 0.6,
        order: 5,
        tier: 1,
        skills: skills({ ranged: true }),
        icon: OrcArcherIcon,
        minIslandSize: 12,
        maxIslandSize: 20,
    },
    {
        uniqueId: 12,
        name: "Orc Raiders",
        friendly: false,
        maxHp: 40,
        attack: 15,
        crit: 0.6,
        order: 1,
        tier: 1,
        skills: skills(),
        icon: OrcFootsoldierIcon,
        minIslandSize: 12,
        maxIslandSize: 20,
    },
    {
        uniqueId: 13,
        name: "Orc Veteran",
        friendly: false,
        maxHp: 90,
        attack: 20,
        crit: 0.6,
        order: 2,
        tier: 3,
        skills: skills(),
        icon: OrcKnightIcon,
        minIslandSize: 20,
    },
    {
        uniqueId: 14,
        name: "Orc Vanguard",
        friendly: false,
        maxHp: 120,
        attack: 10,
        crit: 0.6,
        order: 3,
        tier: 4,
        skills: skills({ firstStrike: true }),
        icon: OrcCuirassierIcon,
        minIslandSize: 24,
    },
    {
        uniqueId: 15,
        name: "Warg Rider",
        friendly: false,
        maxHp: 5,
        attack: 5,
        crit: 0.6,
        order: 4,
        tier: 2,
        skills: skills({ flanking: true, firstStrike: true }),
        icon: OrcCavalryIcon,
        minIslandSize: 14,
    },
    {
        uniqueId: 16,
        name: "Elite Orc Hunters",
        friendly: false,
        maxHp: 10,
        attack: 15,
        crit: 0.6,
        order: 6,
        tier: 2,
        skills: skills({ ranged: true, doubleStrike: true }),
        icon: OrcLongbowArcherIcon,
        minIslandSize: 16,
    },
    {
        uniqueId: 17,
        name: "Elite Orc Sniper",
        friendly: false,
        maxHp: 15,
        attack: 90,
        crit: 0.6,
        order: 7,
        tier: 3,
        skills: skills({ ranged: true }),
        icon: OrcCrossbowArcherIcon,
        minIslandSize: 20,
    },
    {
        uniqueId: 18,
        name: "Orc Demolisher",
        friendly: false,
        maxHp: 60,
        attack: 80,
        crit: 0.6,
        order: 8,
        tier: 4,
        skills: skills({ ranged: true, trample: true, flanking: true, lastStrike: true }),
        icon: OrcCannoneerIcon,
        minIslandSize: 24,
    },
    {
        uniqueId: 19,
        name: "Bula (boss 1)",
        friendly: false,
        maxHp: 5000,
        attack: 150,
        crit: 0.5,
        order: 100,
        tier: 100,
        skills: skills({ trample: true, lastStrike: true }),
        icon: OrcBoss1Icon,
        minIslandSize: 12,
        maxIslandSize: 18,
    },
    {
        uniqueId: 20,
        name: "Aguk (boss 2)",
        friendly: false,
        maxHp: 11000,
        attack: 300,
        crit: 0.5,
        order: 100,
        tier: 150,
        skills: skills({ trample: true, lastStrike: true }),
        icon: OrcBoss2Icon,
        minIslandSize: 16,
        maxIslandSize: 22,
    },
    {
        uniqueId: 21,
        name: "Mazoga (boss 3)",
        friendly: false,
        maxHp: 120000,
        attack: 100,
        crit: 0.5,
        order: 3.5,
        tier: 200,
        skills: skills({ trample: true, lastStrike: true }),
        icon: OrcBoss3Icon,
        minIslandSize: 20,
    },
    {
        uniqueId: 22,
        name: "Durgash (boss 4)",
        friendly: false,
        maxHp: 40000,
        attack: 500,
        crit: 0.5,
        order: 100,
        tier: 300,
        skills: skills({ trample: true, firstStrike: true }),
        icon: OrcBoss4Icon,
        minIslandSize: 20,
    },
];

var unitInfosByName: Map<string, UnitInfo> = (() => {
    var result = new Map<string, UnitInfo>();
    unitInfos.forEach(u => {
        result.set(u.name, u);
    });
    return result;
})()

var unitInfosById: Map<number, UnitInfo> = (() => {
    var result = new Map<number, UnitInfo>();
    unitInfos.forEach(u => {
        result.set(u.uniqueId, u);
    });
    return result;
})()

export function unitInfoByName(name: string): UnitInfo {
    return unitInfosByName.get(name)!;
}

export function unitInfoById(id: number): UnitInfo {
    return unitInfosById.get(id)!;
}

export function validForIslandSize(ui: UnitInfo, islandSize: number): boolean {
    if (islandSize < 12) return true;
    if (ui.minIslandSize && ui.minIslandSize > islandSize) return false;
    if (ui.maxIslandSize && ui.maxIslandSize < islandSize) return false;
    return true;
}