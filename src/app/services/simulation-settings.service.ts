import { ArmyInterfaces } from "../models/army-interface";
import { SimulationSettingDefaults, SimulationSettings } from "../models/simulation-settings";

export class SimulationSettingsService {
    private constructor() {
        this.settings = SimulationSettingDefaults.getDefaultSettings(ArmyInterfaces.getDefaultHumanValues(), ArmyInterfaces.getDefaultOrcValues());
    }

    private static instance: SimulationSettingsService;
    settings: SimulationSettings;

    static getInstance(): SimulationSettingsService {
        if (!SimulationSettingsService.instance) {
            SimulationSettingsService.instance = new SimulationSettingsService();
        }
        return SimulationSettingsService.instance;
    }
}