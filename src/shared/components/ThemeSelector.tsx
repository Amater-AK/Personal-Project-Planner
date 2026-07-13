import { useState, useMemo } from "react";

import { useThemeStore } from "../stores/themeStore";

import { BsBack, BsSunFill, BsMoonFill } from "react-icons/bs";

import { THEMES, type Theme, type ThemeItem } from "../types/theme.type";

export function ThemeSelector() {
    const theme = useThemeStore((state) => state.theme);
    const setTheme = useThemeStore((state) => state.setTheme);

    const [selectedTheme, setSelectedTheme] = useState<Theme>(theme);

    function handleThemeChange(theme: Theme) {
        setSelectedTheme(theme);
        setTheme(theme);
    }

    const items = useMemo((): ThemeItem[] => {
        return [
            {
                id: `theme#${THEMES.SYSTEM}`,
                content: (
                    <span>
                        <BsBack />
                    </span>
                ),
                value: THEMES.SYSTEM,
                title: "System theme",
            },
            {
                id: `theme#${THEMES.LIGHT}`,
                content: (
                    <span>
                        <BsSunFill />
                    </span>
                ),
                value: THEMES.LIGHT,
                title: "Light theme",
            },
            {
                id: `theme#${THEMES.DARK}`,
                content: (
                    <span>
                        <BsMoonFill />
                    </span>
                ),
                value: THEMES.DARK,
                title: "Dark theme",
            },
        ];
    }, [THEMES]);

    return (
        <div className="flex items-center bg-surface-secondary border border-border rounded-md overflow-clip">
            {items.map((item) => (
                <ThemeItem
                    key={item.id}
                    item={item}
                    checked={item.value === selectedTheme}
                    onChange={handleThemeChange}
                />
            ))}
        </div>
    );
}

interface ThemeItemProps {
    item: ThemeItem;
    checked: boolean;
    onChange: (theme: Theme) => void;
}

function ThemeItem({ item, checked, onChange }: ThemeItemProps) {
    return (
        <div>
            <input
                type="radio"
                className="hidden"
                id={item.id}
                value={item.value}
                checked={checked}
                onChange={() => onChange(item.value)}
            />
            <label
                htmlFor={item.id}
                className={`flex items-center gap-2 p-2 cursor-pointer transition-colors duration-300 ${checked ? "text-red-500" : ""}`}
                title={item?.title}
            >
                {item.content}
            </label>
        </div>
    );
}
