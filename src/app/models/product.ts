import ArmoredHorseIcon from '../assets/png/products/Armored Horse.png'
import ArcherIcon from '../assets/png/units/Archer.png'
import BarrelIcon from '../assets/png/products/Barrel.png'
import BeerIcon from '../assets/png/products/Beer.png'
import BookIcon from '../assets/png/products/Book.png'
import BowIcon from '../assets/png/products/Bow.png'
import BreadIcon from '../assets/png/products/Bread.png'
import BrickIcon from '../assets/png/products/Brick.png'
import CandleHolderIcon from '../assets/png/products/Candle Holder.png'
import CandleIcon from '../assets/png/products/Candle.png'
import CannonIcon from '../assets/png/products/Cannon.png'
import CannoneerIcon from '../assets/png/units/Cannoneer.png'
import CattleIcon from '../assets/png/products/Cattle.png'
import CavalryIcon from '../assets/png/units/Cavalry.png'
import CigarsIcon from '../assets/png/products/Cigar.png'
import ClayIcon from '../assets/png/products/Clay.png'
import ClothesIcon from '../assets/png/products/Clothes.png'
import CoalIcon from '../assets/png/products/Coal.png'
import CokeIcon from '../assets/png/products/Coke.png'
import CopperIngotIcon from '../assets/png/products/Copper Ingot.png'
import CopperOreIcon from '../assets/png/products/Copper Ore.png'
import CopperSwordIcon from '../assets/png/products/Copper Sword.png'
import CrossbowIcon from '../assets/png/products/Crossbow.png'
import CrossbowmanIcon from '../assets/png/units/CrossbowArcher.png'
import CuirassierIcon from '../assets/png/units/Cuirassier.png'
import DyeIcon from '../assets/png/products/Dye.png'
import FabricIcon from '../assets/png/products/Fabric.png'
import FeastIcon from '../assets/png/products/Feast.png'
import FireworksIcon from '../assets/png/products/Fireworks.png'
import FishIcon from '../assets/png/products/Fish.png'
import FlourIcon from '../assets/png/products/Flour.png'
import FootsoldierIcon from '../assets/png/units/Footsoldier.png'
import GarmentIcon from '../assets/png/products/Garment.png'
import GemstoneIcon from '../assets/png/products/Gemstone.png'
import GobletIcon from '../assets/png/products/Goblet.png'
import GoldIngotIcon from '../assets/png/products/Gold Ingot.png'
import GoldJewelryIcon from '../assets/png/products/Gold Jewelry.png'
import GoldOreIcon from '../assets/png/products/Gold Ore.png'
import GrapesIcon from '../assets/png/products/Grapes.png'
import GunpowderIcon from '../assets/png/products/Gunpowder.png'
import HoneyIcon from '../assets/png/products/Honey.png'
import HopsIcon from '../assets/png/products/Hops.png'
import HorseIcon from '../assets/png/products/Horse.png'
import IronIngotIcon from '../assets/png/products/Iron Ingot.png'
import IronOreIcon from '../assets/png/products/Iron Ore.png'
import IronSwordIcon from '../assets/png/products/Iron Sword.png'
import KnightIcon from '../assets/png/units/Knight.png'
import LinenIcon from '../assets/png/products/Linen.png'
import LinseedIcon from '../assets/png/products/Linseed.png'
import LinseedOilIcon from '../assets/png/products/Linseed Oil.png'
import LiquerIcon from '../assets/png/products/Liqueur.png'
import LobsterIcon from '../assets/png/products/Lobster.png'
import LongbowArcherIcon from '../assets/png/units/LongbowArcher.png'
import LongbowIcon from '../assets/png/products/Longbow.png'
import MaltIcon from '../assets/png/products/Malt.png'
import MarbleIcon from '../assets/png/products/Marble.png'
import MeatIcon from '../assets/png/products/Meat.png'
import MedicusIcon from '../assets/png/buildings/Medicus.png'
import MetalCuttingsIcon from '../assets/png/products/Metal Cuttings.png'
import MilitiaIcon from '../assets/png/units/Militia.png'
import PaperIcon from '../assets/png/products/Paper.png'
import PioneerDwellingIcon from "../assets/png/buildings/Pioneer's Hut.png"
import PlankIcon from '../assets/png/products/Plank.png'
import RockSaltIcon from '../assets/png/products/Rock Salt.png'
import RopesIcon from '../assets/png/products/Ropes.png'
import SailIcon from '../assets/png/products/Sail.png'
import SaltIcon from '../assets/png/products/Salt.png'
import SaltpeterIcon from '../assets/png/products/Saltpeter.png'
import SchnappsIcon from '../assets/png/products/Schnapps.png'
import SilkClothIcon from '../assets/png/products/Silk Cloth.png'
import SilkIcon from '../assets/png/products/Silk.png'
import StoneIcon from '../assets/png/products/Stone.png'
import SteelIngotIcon from '../assets/png/products/Steel Ingot.png'
import TiltyardIcon from '../assets/png/buildings/Tiltyard.png'
import TobaccoIcon from '../assets/png/products/Tobacco.png'
import ToolsIcon from '../assets/png/products/Tools.png'
import UniversityIcon from '../assets/png/buildings/University.png'
import WheatIcon from '../assets/png/products/Wheat.png'
import WineIcon from '../assets/png/products/Wine.png'
import WoodIcon from '../assets/png/products/Wood.png'
import YarnIcon from '../assets/png/products/Yarn.png'

export type ProductType = 'Fish' | 'Schnapps' | 'Linen' | 'Fabric' | 'Bread' | 'Cigars' | 'Clothes' | 'Beer' | 'Meat' | 'Gold Jewelry' | 'Linseed Oil' | 'Garment' | 'Goblet' | 'Candle Holder'
    | 'Feast' | 'Wine' | 'Horse' | 'Book' | 'Wood' | 'Plank' | 'Stone' | 'Brick' |'Tools' | 'Marble' | 'Ropes' | 'Sail' | 'Steel Ingot' | 'Bow' | 'Copper Sword' | 'Horse' | 'Longbow' | 'Iron Sword'
    | 'Crossbow' | 'Armored Horse' | 'Cannon' | 'Linseed' | 'Copper Ore' | 'Copper Ingot' | 'Yarn' | 'Wheat' | 'Flour' | 'Tobacco' | 'Horse' | 'Clay' | 'Malt' | 'Hops' | 'Cattle' | 'Rock Salt' | 'Salt'
    | 'Coal' | 'Gold Ore' | 'Gold Ingot' | 'Iron Ore' | 'Iron Ingot' | 'Silk' | 'Silk Cloth' | 'Dye' | 'Gemstone' | 'Honey' | 'Candle' | 'Liquer' | 'Lobster' | 'Grapes' | 'Barrel' | 'Paper' | 'Coke'
    | 'Saltpeter' | 'Gunpowder' | 'Metal Cuttings' | 'Fireworks' | 'Militia' | 'Archer' | 'Footsolider' | 'Cavalry' | 'Longbow Archer' | 'Knight' | 'Crossbowman' | 'Cuirassier' | 'Cannoneer' | 'Pioneer Dwelling'
    | 'Medicus' | 'Tiltyard' | 'University';


export const productIconMap: { [productType in ProductType]: string } = {
    'Armored Horse': ArmoredHorseIcon,
    'Archer': ArcherIcon,
    'Barrel': BarrelIcon,
    'Beer': BeerIcon,
    'Book': BookIcon,
    'Bow': BowIcon,
    'Bread': BreadIcon,
    'Brick': BrickIcon,
    'Candle Holder': CandleHolderIcon,
    'Candle': CandleIcon,
    'Cannon': CannonIcon,
    'Cannoneer': CannoneerIcon,
    'Cattle': CattleIcon,
    'Cavalry': CavalryIcon,
    'Cigars': CigarsIcon,
    'Clay': ClayIcon,
    'Clothes': ClothesIcon,
    'Coal': CoalIcon,
    'Coke': CokeIcon,
    'Copper Ingot': CopperIngotIcon,
    'Copper Ore': CopperOreIcon,
    'Copper Sword': CopperSwordIcon,
    'Crossbow': CrossbowIcon,
    'Crossbowman': CrossbowmanIcon,
    'Cuirassier': CuirassierIcon,
    'Dye': DyeIcon,
    'Fabric': FabricIcon,
    'Feast': FeastIcon,
    'Fireworks': FireworksIcon,
    'Fish': FishIcon,
    'Flour': FlourIcon,
    'Footsolider': FootsoldierIcon,
    'Garment': GarmentIcon,
    'Gemstone': GemstoneIcon,
    'Goblet': GobletIcon,
    'Gold Ingot': GoldIngotIcon,
    'Gold Jewelry': GoldJewelryIcon,
    'Gold Ore': GoldOreIcon,
    'Grapes': GrapesIcon,
    'Gunpowder': GunpowderIcon,
    'Honey': HoneyIcon,
    'Hops': HopsIcon,
    'Horse': HorseIcon,
    'Iron Ingot': IronIngotIcon,
    'Iron Ore': IronOreIcon,
    'Iron Sword': IronSwordIcon,
    'Knight': KnightIcon,
    'Linen': LinenIcon,
    'Linseed': LinseedIcon,
    'Linseed Oil': LinseedOilIcon,
    'Liquer': LiquerIcon,
    'Lobster': LobsterIcon,
    'Longbow': LongbowIcon,
    'Longbow Archer': LongbowArcherIcon,
    'Malt': MaltIcon,
    'Marble': MarbleIcon,
    'Meat': MeatIcon,
    'Medicus': MedicusIcon,
    'Metal Cuttings': MetalCuttingsIcon,
    'Militia': MilitiaIcon,
    'Paper': PaperIcon,
    'Pioneer Dwelling': PioneerDwellingIcon,
    'Plank': PlankIcon,
    'Rock Salt': RockSaltIcon,
    'Ropes': RopesIcon,
    'Sail': SailIcon,
    'Salt': SaltIcon,
    'Saltpeter': SaltpeterIcon,
    'Schnapps': SchnappsIcon,
    'Silk': SilkIcon,
    'Silk Cloth': SilkClothIcon,
    'Steel Ingot': SteelIngotIcon,
    'Stone': StoneIcon,
    'Tiltyard': TiltyardIcon,
    'Tobacco': TobaccoIcon,
    'Tools': ToolsIcon,
    'University': UniversityIcon,
    'Wheat': WheatIcon,
    'Wine': WineIcon,
    'Wood': WoodIcon,
    'Yarn': YarnIcon,
}