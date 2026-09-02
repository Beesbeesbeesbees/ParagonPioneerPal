import { ProductType } from "./product";
import ApiaryIcon from '../assets/png/buildings/Apiary.png';
import ArcheryRangeIcon from '../assets/png/buildings/Archery Range.png';
import ArmorsmithIcon from '../assets/png/buildings/Armorsmith.png';
import BakeryIcon from '../assets/png/buildings/Bakery.png';
import BarracksIcon from '../assets/png/buildings/Barracks.png';
import BookbinderIcon from '../assets/png/buildings/Bookbinder.png';
import BowyerIcon from '../assets/png/buildings/Bowyer.png';
import BreweryIcon from '../assets/png/buildings/Brewery.png';
import BrickyardIcon from '../assets/png/buildings/Brickyard.png';
import ButchersShopIcon from "../assets/png/buildings/Butcher's Shop.png";
import CannonFoundryIcon from '../assets/png/buildings/Cannon Foundry.png';
import CannoneersSchoolIcon from "../assets/png/buildings/Cannoneer's School.png";
import CattleRanchIcon from '../assets/png/buildings/Cattle Ranch.png';
import ChandlerIcon from '../assets/png/buildings/Chandler.png';
import CharcoalKilnIcon from '../assets/png/buildings/Charcoal Kiln.png';
import CigarManufacturerIcon from '../assets/png/buildings/Cigar Manufacturer.png';
import ClayPitIcon from '../assets/png/buildings/Clay Pit.png';
import CoalMineIcon from '../assets/png/buildings/Coal Mine.png';
import CokeryIcon from '../assets/png/buildings/Cokery.png';
import CooperIcon from '../assets/png/buildings/Cooper.png';
import CopperArmoryIcon from '../assets/png/buildings/Copper Armory.png';
import CopperMineIcon from '../assets/png/buildings/Copper Mine.png';
import CopperSmelterIcon from '../assets/png/buildings/Copper Smelter.png';
import CottonPlantationIcon from '../assets/png/buildings/Cotton Plantation.png';
import CrossbowMakerIcon from '../assets/png/buildings/Crossbow Maker.png';
import CrossbowShootingRangeIcon from '../assets/png/buildings/Crossbow Shooting Range.png';
import CuirassierAcademyIcon from '../assets/png/buildings/Cuirassier Academy.png';
import DistilleryIcon from '../assets/png/buildings/Distillery.png';
import FineForgeIcon from '../assets/png/buildings/Fine Forge.png';
import FishermanIcon from '../assets/png/buildings/Fisherman.png';
import GemstoneMineIcon from '../assets/png/buildings/Gemstone Mine.png';
import GobletManufacturerIcon from '../assets/png/buildings/Goblet Manufacturer.png';
import GoldMineIcon from '../assets/png/buildings/Gold Mine.png';
import GoldSmelterIcon from '../assets/png/buildings/Gold Smelter.png';
import GoldsmithIcon from '../assets/png/buildings/Goldsmith.png';
import GunsmithIcon from '../assets/png/buildings/Gunsmith.png';
import HopFarmIcon from '../assets/png/buildings/Hop Farm.png';
import HorseBreederIcon from '../assets/png/buildings/Horse Breeder.png';
import IndigoPlantationIcon from '../assets/png/buildings/Indigo Plantation.png';
import IronArmoryIcon from '../assets/png/buildings/Iron Armory.png';
import IronMineIcon from '../assets/png/buildings/Iron Mine.png';
import IronSmelterIcon from '../assets/png/buildings/Iron Smelter.png';
import KnightBarracksIcon from '../assets/png/buildings/Knight Barracks.png';
import LinenWeaverIcon from '../assets/png/buildings/Linen Weaver.png';
import LinseedFarmIcon from '../assets/png/buildings/Linseed Farm.png';
import LinseedOilPressIcon from '../assets/png/buildings/Linseed Oil Press.png';
import LobstererIcon from '../assets/png/buildings/Lobsterer.png';
import LongbowArcheryRangeIcon from '../assets/png/buildings/Longbow Archery Range.png';
import LongbowyerIcon from '../assets/png/buildings/Longbowyer.png';
import LumberjackIcon from '../assets/png/buildings/Lumberjack.png';
import MalthouseIcon from '../assets/png/buildings/Malthouse.png';
import MarbleQuarryIcon from '../assets/png/buildings/Marble Quarry.png';
import MedicusIcon from '../assets/png/buildings/Medicus.png';
import NitrateMakerIcon from '../assets/png/buildings/Nitrate Maker.png';
import NobleKitchenIcon from '../assets/png/buildings/Noble Kitchen.png';
import NobleTailorIcon from '../assets/png/buildings/Noble Tailor.png';
import PaperMillIcon from '../assets/png/buildings/Paper Mill.png';
import PioneerDwellingIcon from "../assets/png/buildings/Pioneer's Hut.png";
import PlaningMillIcon from "../assets/png/buildings/Planing Mill.png";
import PotatoFarmIcon from '../assets/png/buildings/Potato Farm.png';
import PowderMillIcon from '../assets/png/buildings/Powder Mill.png';
import RidingArenaIcon from '../assets/png/buildings/Riding Arena.png';
import RockSaltMineIcon from '../assets/png/buildings/Rock Salt Mine.png';
import RoperyIcon from '../assets/png/buildings/Ropery.png';
import SailmakerIcon from '../assets/png/buildings/Sailmaker.png';
import SaltWorksIcon from '../assets/png/buildings/Salt Works.png';
import SalternIcon from '../assets/png/buildings/Saltern.png';
import SawmillIcon from '../assets/png/buildings/Sawmill.png';
import SheepFarmIcon from '../assets/png/buildings/Sheep Farm.png';
import SilkPlantationIcon from '../assets/png/buildings/Silk Plantation.png';
import SilkTwineMillIcon from '../assets/png/buildings/Silk Twine Mill.png';
import SteelFurnaceIcon from '../assets/png/buildings/Steel Furnace.png';
import StonecutterIcon from '../assets/png/buildings/Stonecutter.png';
import TailorIcon from '../assets/png/buildings/Tailor.png';
import TextileMillIcon from '../assets/png/buildings/Textile Mill.png';
import TiltyardIcon from '../assets/png/buildings/Tiltyard.png';
import TobaccoFarmIcon from '../assets/png/buildings/Tobacco Farm.png';
import ToolmakerIcon from '../assets/png/buildings/Toolmaker.png';
import UniversityIcon from '../assets/png/buildings/University.png';
import WeaverIcon from '../assets/png/buildings/Weaver.png';
import WheatFarmIcon from '../assets/png/buildings/Wheat Farm.png';
import WindmillIcon from '../assets/png/buildings/Windmill.png';
import WinepressIcon from '../assets/png/buildings/Winepress.png';
import WineryIcon from '../assets/png/buildings/Winery.png';

export type Recipe = {
    name: string;
    productType: ProductType;
    productAmount: number;
    productionPerHour: number;
    fieldCount: number | null;
    ingredients: { ingredientType: ProductType, ingredientAmount: number }[];
}

export const recipes: Recipe[] = [
    // --- Pioneer Buildings ---
    {
        name: 'Lumberjack',
        productType: 'Wood',
        productAmount: 1,
        productionPerHour: 300,
        fieldCount: 8,
        ingredients: []
    },
    {
        name: 'Fisherman\'s Hut',
        productType: 'Fish',
        productAmount: 1,
        productionPerHour: 45,
        fieldCount: 4,
        ingredients: []
    },
    {
        name: 'Sawmill',
        productType: 'Plank',
        productAmount: 1,
        productionPerHour: 300,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Wood', ingredientAmount: 1 }]
    },
    {
        name: 'Potato Farm',
        productType: 'Schnapps',
        productAmount: 1,
        productionPerHour: 60,
        fieldCount: 4,
        ingredients: []
    },
    {
        name: 'Pioneer Dwelling',
        productType: 'Militia',
        productAmount: 1,
        productionPerHour: 3,
        fieldCount: null,
        ingredients: []
    },
    // --- Colonist Buildings ---
    {
        name: 'Linseed Farm',
        productType: 'Linseed',
        productAmount: 1,
        productionPerHour: 30,
        fieldCount: 8,
        ingredients: []
    },
    {
        name: 'Linen Weaver',
        productType: 'Linen',
        productAmount: 1,
        productionPerHour: 30,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Linseed', ingredientAmount: 2 }]
    },
    {
        name: 'Bowyer',
        productType: 'Bow',
        productAmount: 1,
        productionPerHour: 30,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Linseed', ingredientAmount: 1 }, { ingredientType: 'Wood', ingredientAmount: 5 }]
    },
    {
        name: 'Archery Range',
        productType: 'Archer',
        productAmount: 1,
        productionPerHour: 6,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Bow', ingredientAmount: 1 }, { ingredientType: 'Militia', ingredientAmount: 1 }]
    },
    {
        name: 'Ropery',
        productType: 'Ropes',
        productAmount: 1,
        productionPerHour: 30,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Linseed', ingredientAmount: 1 }]
    },
    {
        name: 'Stonecutter',
        productType: 'Stone',
        productAmount: 1,
        productionPerHour: 60 / 7,
        fieldCount: 1,
        ingredients: []
    },
    {
        name: 'Copper Mine',
        productType: 'Copper Ore',
        productAmount: 1,
        productionPerHour: 15,
        fieldCount: null,
        ingredients: []
    },
    {
        name: 'Copper Smelter',
        productType: 'Copper Ingot',
        productAmount: 1,
        productionPerHour: 7.5,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Wood', ingredientAmount: 10 }, { ingredientType: 'Copper Ore', ingredientAmount: 1 }]
    },
    {
        name: 'Copper Armory',
        productType: 'Copper Sword',
        productAmount: 1,
        productionPerHour: 7.5,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Wood', ingredientAmount: 10 }, { ingredientType: 'Copper Ingot', ingredientAmount: 1 }]
    },
    {
        name: 'Barracks',
        productType: 'Footsolider',
        productAmount: 1,
        productionPerHour: 6,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Copper Sword', ingredientAmount: 1 }, { ingredientType: 'Militia', ingredientAmount: 1 }]
    },
    // --- Townsmen Buildings ---
    {
        name: 'Sheep Farm',
        productType: 'Yarn',
        productAmount: 1,
        productionPerHour: 30,
        fieldCount: 8,
        ingredients: []
    },
    {
        name: 'Weaver',
        productType: 'Fabric',
        productAmount: 1,
        productionPerHour: 30,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Yarn', ingredientAmount: 2 }]
    },
    {
        name: 'Wheat Farm',
        productType: 'Wheat',
        productAmount: 1,
        productionPerHour: 30,
        fieldCount: 8,
        ingredients: []
    },
    {
        name: 'Windmill',
        productType: 'Flour',
        productAmount: 1,
        productionPerHour: 30,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Wheat', ingredientAmount: 2 }]
    },
    {
        name: 'Bakery',
        productType: 'Bread',
        productAmount: 1,
        productionPerHour: 15,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Flour', ingredientAmount: 1 }]
    },
    {
        name: 'Horse Breeder',
        productType: 'Horse',
        productAmount: 1,
        productionPerHour: 10,
        fieldCount: 20,
        ingredients: []
    },
    {
        name: 'Riding Arena',
        productType: 'Cavalry',
        productAmount: 1,
        productionPerHour: 6,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Horse', ingredientAmount: 1 }, { ingredientType: 'Militia', ingredientAmount: 1 }]
    },
    {
        name: 'Tobacco Farm',
        productType: 'Tobacco',
        productAmount: 1,
        productionPerHour: 30,
        fieldCount: 8,
        ingredients: []
    },
    {
        name: 'Cigar Manufacturer',
        productType: 'Cigars',
        productAmount: 1,
        productionPerHour: 30,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Tobacco', ingredientAmount: 2 }]
    },
    {
        name: 'Sailmaker',
        productType: 'Sail',
        productAmount: 1,
        productionPerHour: 15,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Ropes', ingredientAmount: 1 }, { ingredientType: 'Yarn', ingredientAmount: 2 }]
    },
    {
        name: 'Charcoal Kiln',
        productType: 'Coal',
        productAmount: 1,
        productionPerHour: 15,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Wood', ingredientAmount: 20}]
    },
    {
        name: 'Clay Pit',
        productType: 'Clay',
        productAmount: 1,
        productionPerHour: 30,
        fieldCount: null,
        ingredients: []
    },
    {
        name: 'Brickyard',
        productType: 'Brick',
        productAmount: 1,
        productionPerHour: 15,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Coal', ingredientAmount: 1 }, { ingredientType: 'Clay', ingredientAmount: 1 }]
    },
    {
        name: 'Longbowyer',
        productType: 'Longbow',
        productAmount: 1,
        productionPerHour: 30,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Linseed', ingredientAmount: 2 }, { ingredientType: 'Wood', ingredientAmount: 10 }]
    },
    {
        name: 'Longbow Archery Range',
        productType: 'Longbow Archer',
        productAmount: 1,
        productionPerHour: 6,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Longbow', ingredientAmount: 1 }, { ingredientType: 'Militia', ingredientAmount: 1 }]
    },
    // --- Merchant Buildings ---
    {
        name: 'Cotton Plantation',
        productType: 'Yarn',
        productAmount: 1,
        productionPerHour: 60,
        fieldCount: 8,
        ingredients: []
    },
    {
        name: 'Textile Mill',
        productType: 'Fabric',
        productAmount: 1,
        productionPerHour: 45,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Yarn', ingredientAmount: 2 }]
    },
    {
        name: 'Tailor',
        productType: 'Clothes',
        productAmount: 1,
        productionPerHour: 15,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Fabric', ingredientAmount: 4 }]
    },
    {
        name: 'Coal Mine',
        productType: 'Coal',
        productAmount: 1,
        productionPerHour: 30,
        fieldCount: null,
        ingredients: []
    },
    {
        name: 'Hop Farm',
        productType: 'Hops',
        productAmount: 1,
        productionPerHour: 30,
        fieldCount: 8,
        ingredients: []
    },
    {
        name: 'Malthouse',
        productType: 'Malt',
        productAmount: 1,
        productionPerHour: 30,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Wheat', ingredientAmount: 2 }]
    },
    {
        name: 'Brewery',
        productType: 'Beer',
        productAmount: 2,
        productionPerHour: 15,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Hops', ingredientAmount: 3 }, { ingredientType: 'Malt', ingredientAmount: 1 }]
    },
    {
        name: 'Linseed Oil Press',
        productType: 'Linseed Oil',
        productAmount: 1,
        productionPerHour: 20,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Linseed', ingredientAmount: 2 }]
    },
    {
        name: 'Medicus',
        productType: 'Medicus',
        productAmount: 1,
        productionPerHour: 1,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Linseed Oil', ingredientAmount: 60 }]
    },
    {
        name: 'Iron Mine',
        productType: 'Iron Ore',
        productAmount: 1,
        productionPerHour: 15,
        fieldCount: null,
        ingredients: []
    },
    {
        name: 'Iron Smelter',
        productType: 'Iron Ingot',
        productAmount: 2,
        productionPerHour: 3.75,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Coal', ingredientAmount: 1 }, { ingredientType: 'Iron Ore', ingredientAmount: 2 }]
    },
    {
        name: 'Toolmaker',
        productType: 'Tools',
        productAmount: 4,
        productionPerHour: 3.75,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Coal', ingredientAmount: 1 }, { ingredientType: 'Iron Ingot', ingredientAmount: 2 }]
    },
    {
        name: 'Iron Armory',
        productType: 'Iron Sword',
        productAmount: 2,
        productionPerHour: 3.75,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Coal', ingredientAmount: 1 }, { ingredientType: 'Iron Ingot', ingredientAmount: 2 }]
    },
    {
        name: 'Knight Barracks',
        productType: 'Knight',
        productAmount: 1,
        productionPerHour: 6,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Iron Sword', ingredientAmount: 1 }, { ingredientType: 'Militia', ingredientAmount: 1 }]
    },
    {
        name: 'Cattle Ranch',
        productType: 'Cattle',
        productAmount: 1,
        productionPerHour: 15,
        fieldCount: 8,
        ingredients: []
    },
    {
        name: 'Rock Salt Mine',
        productType: 'Rock Salt',
        productAmount: 1,
        productionPerHour: 15,
        fieldCount: null,
        ingredients: []
    },
    {
        name: 'Salt Works',
        productType: 'Salt',
        productAmount: 6,
        productionPerHour: 7.5,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Coal', ingredientAmount: 1 }, { ingredientType: 'Rock Salt', ingredientAmount: 2 }]
    },
    {
        name: 'Saltern',
        productType: 'Salt',
        productAmount: 1,
        productionPerHour: 7.5,
        fieldCount: 2,
        ingredients: []
    },
    {
        name: 'Butcher\'s Shop',
        productType: 'Meat',
        productAmount: 4,
        productionPerHour: 15,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Salt', ingredientAmount: 1 }, { ingredientType: 'Cattle', ingredientAmount: 2 }]
    },
    {
        name: 'Gold Mine',
        productType: 'Gold Ore',
        productAmount: 1,
        productionPerHour: 15,
        fieldCount: null,
        ingredients: []
    },
    {
        name: 'Gold Smelter',
        productType: 'Gold Ingot',
        productAmount: 2,
        productionPerHour: 3.75,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Coal', ingredientAmount: 1 }, { ingredientType: 'Gold Ore', ingredientAmount: 2}]
    },
    {
        name: 'Goldsmith',
        productType: 'Gold Jewelry',
        productAmount: 2,
        productionPerHour: 3.75,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Coal', ingredientAmount: 1 }, { ingredientType: 'Gold Ingot', ingredientAmount: 2 }]
    },
    {
        name: 'Crossbow Maker',
        productType: 'Crossbow',
        productAmount: 1,
        productionPerHour: 15,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Linseed', ingredientAmount: 2 }, { ingredientType: 'Iron Ingot', ingredientAmount: 1 }]
    },
    {
        name: 'Crossbow Shooting Range',
        productType: 'Crossbowman',
        productAmount: 1,
        productionPerHour: 6,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Crossbow', ingredientAmount: 1 }, { ingredientType: 'Militia', ingredientAmount: 1 }]
    },
    {
        name: 'Marble Quarry',
        productType: 'Marble',
        productAmount: 1,
        productionPerHour: 15,
        fieldCount: null,
        ingredients: []
    },
    // --- Paragon Buildings ---
    {
        name: 'Silk Plantation',
        productType: 'Silk',
        productAmount: 1,
        productionPerHour: 30,
        fieldCount: 8,
        ingredients: []
    },
    {
        name: 'Silk Twine Mill',
        productType: 'Silk Cloth',
        productAmount: 1,
        productionPerHour: 30,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Silk', ingredientAmount: 2 }]
    },
    {
        name: 'Indigo Plantation',
        productType: 'Dye',
        productAmount: 1,
        productionPerHour: 30,
        fieldCount: 8,
        ingredients: []
    },
    {
        name: 'Noble Tailor',
        productType: 'Garment',
        productAmount: 1,
        productionPerHour: 15,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Dye', ingredientAmount: 1 }, { ingredientType: 'Silk Cloth', ingredientAmount: 1 }]
    },
    {
        name: 'Gemstone Mine',
        productType: 'Gemstone',
        productAmount: 1,
        productionPerHour: 20,
        fieldCount: null,
        ingredients: []
    },
    {
        name: 'Goblet Manufacturer',
        productType: 'Goblet',
        productAmount: 2,
        productionPerHour: 7.5,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Gemstone', ingredientAmount: 1 }, { ingredientType: 'Gold Ingot', ingredientAmount: 1 }]
    },
    {
        name: 'Tiltyard',
        productType: 'Tiltyard',
        productAmount: 1,
        productionPerHour: 1,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Horse', ingredientAmount: 20 }]
    },
    {
        name: 'Apiary',
        productType: 'Honey',
        productAmount: 1,
        productionPerHour: 15,
        fieldCount: 8,
        ingredients: []
    },
    {
        name: 'Chandler',
        productType: 'Candle',
        productAmount: 2,
        productionPerHour: 15,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Honey', ingredientAmount: 2 }, { ingredientType: 'Linseed', ingredientAmount: 1 }]
    },
    {
        name: 'Fine Forge',
        productType: 'Candle Holder',
        productAmount: 3,
        productionPerHour: 15,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Copper Ingot', ingredientAmount: 1 }, { ingredientType: 'Candle', ingredientAmount: 3 }]
    },
    {
        name: 'Cokery',
        productType: 'Coke',
        productAmount: 1,
        productionPerHour: 15,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Coal', ingredientAmount: 2 }]
    },
    {
        name: 'Steel Furnace',
        productType: 'Steel Ingot',
        productAmount: 1,
        productionPerHour: 15,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Coke', ingredientAmount: 1 }, { ingredientType: 'Iron Ingot', ingredientAmount: 1 }]
    },
    {
        name: 'Armorsmith',
        productType: 'Armored Horse',
        productAmount: 1,
        productionPerHour: 15,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Horse', ingredientAmount: 1 }, { ingredientType: 'Steel Ingot', ingredientAmount: 1}]
    },
    {
        name: 'Cuirassier Academy',
        productType: 'Cuirassier',
        productAmount: 1,
        productionPerHour: 6,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Armored Horse', ingredientAmount: 1 }, { ingredientType: 'Militia', ingredientAmount: 1 }]
    },
    {
        name: 'Distillery',
        productType: 'Liquer',
        productAmount: 1,
        productionPerHour: 30,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Honey', ingredientAmount: 1 }, { ingredientType: 'Schnapps', ingredientAmount: 2 }]
    },
    {
        name: 'Lobsterer',
        productType: 'Lobster',
        productAmount: 1,
        productionPerHour: 90,
        fieldCount: 1,
        ingredients: []
    },
    {
        name: 'Noble Kitchen',
        productType: 'Feast',
        productAmount: 2,
        productionPerHour: 45,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Liquer', ingredientAmount: 1 }, { ingredientType: 'Lobster', ingredientAmount: 2 }]
    },
    {
        name: 'Winery',
        productType: 'Grapes',
        productAmount: 1,
        productionPerHour: 45,
        fieldCount: 12,
        ingredients: []
    },
    {
        name: 'Cooper',
        productType: 'Barrel',
        productAmount: 3,
        productionPerHour: 15,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Iron Ingot', ingredientAmount: 1 }, { ingredientType: 'Plank', ingredientAmount: 16 }]
    },
    {
        name: 'Winepress',
        productType: 'Wine',
        productAmount: 3,
        productionPerHour: 15,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Barrel', ingredientAmount: 2 }, { ingredientType: 'Grapes', ingredientAmount: 4 }]
    },
    {
        name: 'Paper Mill',
        productType: 'Paper',
        productAmount: 1,
        productionPerHour: 30,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Wood', ingredientAmount: 16 }]
    },
    {
        name: 'Bookbinder',
        productType: 'Book',
        productAmount: 1,
        productionPerHour: 7.5,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Dye', ingredientAmount: 2 }, { ingredientType: 'Paper', ingredientAmount: 4 }]
    },
    {
        name: 'University',
        productType: 'University',
        productAmount: 1,
        productionPerHour: 1,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Book', ingredientAmount: 15 }]
    },
    {
        name: 'Nitrate Maker',
        productType: 'Saltpeter',
        productAmount: 1,
        productionPerHour: 15,
        fieldCount: 1,
        ingredients: []
    },
    {
        name: 'Powder Mill',
        productType: 'Gunpowder',
        productAmount: 1,
        productionPerHour: 15,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Coal', ingredientAmount: 1 }, { ingredientType: 'Saltpeter', ingredientAmount: 1 }]
    },
    {
        name: 'Cannon Foundry',
        productType: 'Cannon',
        productAmount: 1,
        productionPerHour: 7.5,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Gunpowder', ingredientAmount: 1 }, { ingredientType: 'Steel Ingot', ingredientAmount: 1 }]
    },
    {
        name: 'Cannoneer\'s School',
        productType: 'Cannoneer',
        productAmount: 1,
        productionPerHour: 6,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Cannon', ingredientAmount: 1 }, { ingredientType: 'Militia', ingredientAmount: 1 }]
    },
    {
        name: 'Planing Mill',
        productType: 'Metal Cuttings',
        productAmount: 2,
        productionPerHour: 15,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Iron Ingot', ingredientAmount: 1 }, { ingredientType: 'Copper Ingot', ingredientAmount: 1 }]
    },
    {
        name: 'Gunsmith',
        productType: 'Fireworks',
        productAmount: 1,
        productionPerHour: 15,
        fieldCount: null,
        ingredients: [{ ingredientType: 'Gunpowder', ingredientAmount: 2 }, { ingredientType: 'Metal Cuttings', ingredientAmount: 2 }]
    }
]

export const recipeIconMap: { [key: string]: string } = {
    'Lumberjack': LumberjackIcon,
    "Fisherman's Hut": FishermanIcon,
    'Sawmill': SawmillIcon,
    'Potato Farm': PotatoFarmIcon,
    'Pioneer Dwelling': PioneerDwellingIcon,
    'Linseed Farm': LinseedFarmIcon,
    'Linen Weaver': LinenWeaverIcon,
    'Bowyer': BowyerIcon,
    'Archery Range': ArcheryRangeIcon,
    'Ropery': RoperyIcon,
    'Stonecutter': StonecutterIcon,
    'Copper Mine': CopperMineIcon,
    'Copper Smelter': CopperSmelterIcon,
    'Copper Armory': CopperArmoryIcon,
    'Barracks': BarracksIcon,
    'Sheep Farm': SheepFarmIcon,
    'Weaver': WeaverIcon,
    'Wheat Farm': WheatFarmIcon,
    'Windmill': WindmillIcon,
    'Bakery': BakeryIcon,
    'Horse Breeder': HorseBreederIcon,
    'Riding Arena': RidingArenaIcon,
    'Tobacco Farm': TobaccoFarmIcon,
    'Cigar Manufacturer': CigarManufacturerIcon,
    'Sailmaker': SailmakerIcon,
    'Charcoal Kiln': CharcoalKilnIcon,
    'Clay Pit': ClayPitIcon,
    'Brickyard': BrickyardIcon,
    'Longbowyer': LongbowyerIcon,
    'Longbow Archery Range': LongbowArcheryRangeIcon,
    'Cotton Plantation': CottonPlantationIcon,
    'Textile Mill': TextileMillIcon,
    'Tailor': TailorIcon,
    'Coal Mine': CoalMineIcon,
    'Hop Farm': HopFarmIcon,
    'Malthouse': MalthouseIcon,
    'Brewery': BreweryIcon,
    'Linseed Oil Press': LinseedOilPressIcon,
    'Medicus': MedicusIcon,
    'Iron Mine': IronMineIcon,
    'Iron Smelter': IronSmelterIcon,
    'Toolmaker': ToolmakerIcon,
    'Iron Armory': IronArmoryIcon,
    'Knight Barracks': KnightBarracksIcon,
    'Cattle Ranch': CattleRanchIcon,
    'Rock Salt Mine': RockSaltMineIcon,
    'Salt Works': SaltWorksIcon,
    'Saltern': SalternIcon,
    "Butcher's Shop": ButchersShopIcon,
    'Gold Mine': GoldMineIcon,
    'Gold Smelter': GoldSmelterIcon,
    'Goldsmith': GoldsmithIcon,
    'Crossbow Maker': CrossbowMakerIcon,
    'Crossbow Shooting Range': CrossbowShootingRangeIcon,
    'Marble Quarry': MarbleQuarryIcon,
    'Silk Plantation': SilkPlantationIcon,
    'Silk Twine Mill': SilkTwineMillIcon,
    'Indigo Plantation': IndigoPlantationIcon,
    'Noble Tailor': NobleTailorIcon,
    'Gemstone Mine': GemstoneMineIcon,
    'Goblet Manufacturer': GobletManufacturerIcon,
    'Tiltyard': TiltyardIcon,
    'Apiary': ApiaryIcon,
    'Chandler': ChandlerIcon,
    'Fine Forge': FineForgeIcon,
    'Cokery': CokeryIcon,
    'Steel Furnace': SteelFurnaceIcon,
    'Armorsmith': ArmorsmithIcon,
    'Cuirassier Academy': CuirassierAcademyIcon,
    'Distillery': DistilleryIcon,
    'Lobsterer': LobstererIcon,
    'Noble Kitchen': NobleKitchenIcon,
    'Winery': WineryIcon,
    'Cooper': CooperIcon,
    'Winepress': WinepressIcon,
    'Paper Mill': PaperMillIcon,
    'Bookbinder': BookbinderIcon,
    'University': UniversityIcon,
    'Nitrate Maker': NitrateMakerIcon,
    'Powder Mill': PowderMillIcon,
    'Cannon Foundry': CannonFoundryIcon,
    "Cannoneer's School": CannoneersSchoolIcon,
    'Planing Mill': PlaningMillIcon,
    'Gunsmith': GunsmithIcon
}