import { Logo } from "./Logo";
import { ThemeSelector } from "./ThemeSelector";

export function Header() {
    return (
        <header className="flex justify-between items-center gap-6 p-2">
            <Logo />

            <ThemeSelector />
        </header>
    );
}
