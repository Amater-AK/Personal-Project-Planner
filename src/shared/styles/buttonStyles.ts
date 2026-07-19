import { tv, type VariantProps } from "tailwind-variants";

export const buttonStyles = tv({
    base: "inline-flex items-center gap-2 whitespace-nowrap border rounded-medium cursor-pointer transition-colors duration-300 disabled:cursor-not-allowed disabled:brightness-50",
    variants: {
        intent: {
            primary:
                "text-button-primary-text bg-button-primary-bg border-button-primary-border hover:text-button-primary-text-hover hover:bg-button-primary-bg-hover hover:border-button-primary-border-hover",
            secondary:
                "text-button-secondary-text bg-button-secondary-bg border-button-secondary-border hover:text-button-secondary-text-hover hover:bg-button-secondary-bg-hover hover:border-button-secondary-border-hover",
            regular:
                "text-button-regular-text bg-button-regular-bg border-button-regular-border hover:text-button-regular-text-hover hover:bg-button-regular-bg-hover hover:border-button-regular-border-hover",
            danger: "text-button-danger-text bg-button-danger-bg border-button-danger-border hover:text-button-danger-text-hover hover:bg-button-danger-bg-hover hover:border-button-danger-border-hover",
        },
        width: {
            content: "",
            full: "w-full justify-center",
        },
        onlyIcon: {
            true: "p-[0.3em]",
            false: "px-[0.5em] py-[0.2em]",
        },
    },
    defaultVariants: {
        intent: "primary",
        width: "content",
        onlyIcon: false,
    },
});

export type ButtonVariants = VariantProps<typeof buttonStyles>;
