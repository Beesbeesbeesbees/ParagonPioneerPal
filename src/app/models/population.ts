import { ProductType } from "./product";
import PioneersHutIcon from "../assets/png/buildings/Pioneer's Hut.png";
import ColonistHouseIcon from '../assets/png/buildings/Colonist\'s House.png';
import TownsmenHouseIcon from "../assets/png/buildings/Townsmen's House.png";
import MerchantMansionIcon from "../assets/png/buildings/Merchant's Mansion.png";
import ParagonResidenceIcon from "../assets/png/buildings/Paragon's Residence.png";

export type PopulationType = 'Pioneer' | 'Colonist' | 'Townsmen' | 'Merchant' | 'Paragon';

export type Population = {
    type: PopulationType;
    icon: string;
    needs: { needType: ProductType, needAmount: number }[];
}

export const populations: Map<PopulationType, Population> = new Map<PopulationType, Population>([
    ['Pioneer', { type: 'Pioneer', icon: PioneersHutIcon, needs: [
        { needType: 'Fish', needAmount: 7.5 },
        { needType: 'Schnapps', needAmount: 5 },
    ]}],
    ['Colonist', { type: 'Colonist', icon: ColonistHouseIcon, needs: [
        { needType: 'Fish', needAmount: 22.5 },
        { needType: 'Schnapps', needAmount: 20 },
        { needType: 'Linen', needAmount: 5 },
    ]}],
    ['Townsmen', { type: 'Townsmen', icon: TownsmenHouseIcon, needs: [
        { needType: 'Fish', needAmount: 30 },
        { needType: 'Schnapps', needAmount: 30 },
        { needType: 'Linen', needAmount: 7.5 },
        { needType: 'Fabric', needAmount: 5 },
        { needType: 'Bread', needAmount: 4.8 },
        { needType: 'Cigars', needAmount: 3.2 },
    ]}],
    ['Merchant', { type: 'Merchant', icon: MerchantMansionIcon, needs: [
        { needType: 'Fish', needAmount: 37.5 },
        { needType: 'Schnapps', needAmount: 37.5 },
        { needType: 'Cigars', needAmount: 4 },
        { needType: 'Bread', needAmount: 6 },
        { needType: 'Clothes', needAmount: 3 },
        { needType: 'Beer', needAmount: 6 },
        { needType: 'Meat', needAmount: 12 },
        { needType: 'Gold Jewelry', needAmount: 2 },
    ]}],
    ['Paragon', { type: 'Paragon', icon: ParagonResidenceIcon, needs: [
        { needType: 'Cigars', needAmount: 3600 * 30 / 22500 },
        { needType: 'Clothes', needAmount: 3600 * 30 / 30000 },
        { needType: 'Beer', needAmount: 3600 * 30 / 15000 },
        { needType: 'Meat', needAmount: 3600 * 30 / 7500 },
        { needType: 'Garment', needAmount: 3600 * 30 / 15300 },
        { needType: 'Goblet', needAmount: 3600 * 30 / 30600 },
        { needType: 'Candle Holder', needAmount: 3600 * 30 / 20400 },
        { needType: 'Feast', needAmount: 3600 * 30 / 10200 },
        { needType: 'Wine', needAmount: 3600 * 30 / 13600 },
    ]}]
]);