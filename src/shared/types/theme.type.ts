export const THEMES = {
    SYSTEM: "system",
    LIGHT: "light",
    DARK: "dark",
} as const;

export type Theme = (typeof THEMES)[keyof typeof THEMES];

export interface ThemeItem {
    id: string;
    content: React.ReactNode;
    value: Theme;
    title?: string;
}
