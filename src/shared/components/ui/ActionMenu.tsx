import { useState, useEffect, useRef, createContext, useContext, cloneElement, isValidElement } from "react";

interface ActionMenuContext {
    closeMenu: () => void | null;
}

interface ActionMenuProps {
    trigger: React.ReactNode;
    className: string | ((isOpen: boolean) => string);
    children: React.ReactNode;
}

interface TriggerInjectedProps {
    onClick: (event: React.PointerEvent) => void;
}

const MenuContext = createContext<ActionMenuContext>(null);

export function ActionMenu({ children, trigger, className }: ActionMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    function closeMenu() {
        setIsOpen(false);
    }

    function handleToggle(event: React.PointerEvent) {
        event.stopPropagation();
        setIsOpen((prevState) => !prevState);
    }

    useEffect(() => {
        function handleClickOutside(event: PointerEvent) {
            if (!(event.target instanceof Node)) return;
            if (!menuRef.current) return;

            if (!menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener("pointerdown", handleClickOutside);
        }

        return () => document.removeEventListener("pointerdown", handleClickOutside);
    }, [isOpen]);

    let renderedTrigger: React.ReactElement<TriggerInjectedProps> | null = null;
    if (isValidElement(trigger)) {
        renderedTrigger = cloneElement(trigger as React.ReactElement<TriggerInjectedProps>, { onClick: handleToggle });
    } else {
        console.warn("ActionMenu: trigger is not a valid ReactElement.");
    }

    return (
        <MenuContext value={{ closeMenu }}>
            <div ref={menuRef} className="relative inline-block">
                {renderedTrigger}
                <div
                    className={`absolute ${typeof className === "function" ? className(isOpen) : className}`}
                    inert={!isOpen}
                >
                    {children}
                </div>
            </div>
        </MenuContext>
    );
}

interface ActionButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

function ActionButton({ children, className, onClick }: ActionButtonProps) {
    const { closeMenu } = useActionMenu();

    function handleClick() {
        onClick?.();
        closeMenu();
    }

    return (
        <button className={className} onClick={handleClick}>
            {children}
        </button>
    );
}

function useActionMenu() {
    const ctx = useContext(MenuContext);

    if (!ctx) {
        throw new Error("ActionMenu child elements must be used within a parent ActionMenu component.");
    }

    return ctx;
}

ActionMenu.ActionButton = ActionButton;
