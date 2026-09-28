import { buttonStyles, type ButtonVariants } from "@/shared/styles/buttonStyles";

interface Props extends React.ComponentProps<"button">, ButtonVariants {}

type ButtonVariantsKeys = keyof ButtonVariants;

export function Button({ children, className, ...props }: Props) {
    const variantProps: Record<string, string> = {};
    const nativeProps: Record<string, string> = {};

    const variantKeys = buttonStyles.variantKeys;

    Object.entries(props).forEach(([key, value]) => {
        if (variantKeys.includes(key as ButtonVariantsKeys)) {
            variantProps[key] = value;
        } else {
            nativeProps[key] = value;
        }
    });

    return (
        <button className={buttonStyles({ ...variantProps, className })} {...nativeProps}>
            {children}
        </button>
    );
}
