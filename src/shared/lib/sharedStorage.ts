import { STORAGE_KEY } from "../config/env";

export const sharedStorage = {
    getItem: (name: string): string | null => {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;

        try {
            const fullStorage = JSON.parse(raw);

            if (fullStorage && fullStorage[name]) {
                return JSON.stringify(fullStorage[name]);
            }
        } catch (error) {
            console.error("Error reading sharedStorage.", error);
        }

        return null;
    },

    setItem: (name: string, value: string): void => {
        const raw = localStorage.getItem(STORAGE_KEY);
        let fullStorage: Record<string, string> = {};

        if (raw) {
            try {
                fullStorage = JSON.parse(raw);
            } catch (error) {
                fullStorage = {};
            }
        }

        fullStorage[name] = JSON.parse(value);

        localStorage.setItem(STORAGE_KEY, JSON.stringify(fullStorage));
    },

    removeItem: (name: string): void => {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;

        try {
            const fullStorage = JSON.parse(raw);
            delete fullStorage[name];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(fullStorage));
        } catch (error) {
            console.error(error);
        }
    },
};
