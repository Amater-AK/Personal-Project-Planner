import { useEffect, useCallback } from "react";

import { useThemeStore } from "@/shared/stores/themeStore";

import { THEMES, type Theme } from "@/shared/types/theme.type";

export function ThemeProvider(): null {
    const theme = useThemeStore((state) => state.theme);

    const applyTheme = useCallback(
        (theme: Theme) => {
            const documentElem = document.documentElement;
            documentElem.classList.remove(THEMES.LIGHT, THEMES.DARK);

            let appliedTheme = theme;
            if (theme === THEMES.SYSTEM) {
                appliedTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? THEMES.LIGHT : THEMES.DARK;
            }

            documentElem.classList.add(appliedTheme);
        },
        [THEMES],
    );

    // При переключении темы через компонент
    useEffect(() => {
        applyTheme(theme);
    }, [theme, applyTheme]);

    // При переключении темы в системе
    useEffect(() => {
        function handleMediaChange() {
            if (theme !== THEMES.SYSTEM) return;

            applyTheme(theme);
        }

        const media = window.matchMedia("(prefers-color-scheme: light)");
        media.addEventListener("change", handleMediaChange);

        return () => media.removeEventListener("change", handleMediaChange);
    }, [theme, applyTheme]);

    return null;
}
