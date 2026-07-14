import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { sharedStorage } from "@/shared/lib/sharedStorage";

import { THEMES, type Theme } from "../types/theme.type";

interface ThemeState {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        immer((set) => ({
            theme: THEMES.SYSTEM,

            toggleTheme: () =>
                set((state) => {
                    state.theme = state.theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
                }),
            setTheme: (theme: Theme) =>
                set((state) => {
                    state.theme = theme;
                }),
        })),
        { name: "theme-slice", storage: createJSONStorage(() => sharedStorage) },
    ),
);
