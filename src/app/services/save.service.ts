import { Island } from "../models/island";
import { SimulationSettings } from "../models/simulation-settings";
import { SimulationSettingsService } from "./simulation-settings.service";

export class SaveService {
    private static instance: SaveService;
    
    private constructor(
        private simulationSettingsService: SimulationSettingsService = SimulationSettingsService.getInstance()
    ) {}
    
    static getInstance(): SaveService {
        if (!SaveService.instance) {
            SaveService.instance = new SaveService();
        }
        return SaveService.instance;
    }

    private saveTimeout?: ReturnType<typeof setTimeout>;

    saveToLocalStorage(islands: Island[]) {
        if (this.saveTimeout) {
            clearTimeout(this.saveTimeout);
        }

        this.saveTimeout = setTimeout(() => {
            this.saveSerializedToLocalStorage(this.serializeSave(islands));
            this.saveTimeout = undefined;
        }, 1000);
    }

    loadFromLocalStorageOrDefault(): Island[] | null {
        const fromStorage = this.getSerializedFromLocalStorage();
        if (fromStorage) {
            return this.applyDeserializedSave(fromStorage);
        }
        else {
            return null;
        }
    }

    exportSave(islands: Island[]): void {
        const saveBlob = new Blob([this.serializeSave(islands)], { type: "application/json" });
        const downloadUrl = URL.createObjectURL(saveBlob);
        const downloadLink = document.createElement("a");
        downloadLink.href = downloadUrl;
        downloadLink.download = "paragon-pioneer-pal-save.json";
        downloadLink.click();
        URL.revokeObjectURL(downloadUrl);
    }

    importSave(): Promise<Island[] | null> {
        return new Promise((resolve, reject) => {
            const fileInput = document.createElement("input");
            fileInput.type = "file";
            fileInput.accept = ".json,application/json";
            fileInput.addEventListener("change", async () => {
                const file = fileInput.files?.[0];
                if (!file) {
                    resolve(null);
                    return;
                }

                try {
                    resolve(this.applyDeserializedSave(await file.text()));
                }
                catch (error) {
                    reject(error);
                }
            }, { once: true });
            fileInput.click();
        });
    }

    private serializeSave(islands: Island[]): string {
        return JSON.stringify({
            islands: islands,
            simulationSettings: this.simulationSettingsService.settings
        });
    }

    private applyDeserializedSave(serializedSave: string): Island[] {
        const deserialized = this.deserializeSave(serializedSave);
        this.simulationSettingsService.settings = deserialized.simulationSettings;
        return deserialized.islands;
    }

    private deserializeSave(serializedSave: string): SaveGamePayload {
        return JSON.parse(serializedSave) as SaveGamePayload;
    }

    private saveSerializedToLocalStorage(serializedSave: string) {
        localStorage.setItem("saveGame", serializedSave);
    }

    private getSerializedFromLocalStorage(): string | null {
        return localStorage.getItem("saveGame");
    }
}

export type SaveGamePayload = {
    islands: Island[];
    simulationSettings: SimulationSettings;
}