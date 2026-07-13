import { buttonStyles, type ButtonVariants } from "@/shared/styles/buttonStyles";

interface Props extends React.ComponentProps<"button">, ButtonVariants {}

export function Button({ children, className, ...props }: Props) {
    const variantProps: Record<string, any> = {};
    const nativeProps: Record<string, any> = {};

    const variantKeys = buttonStyles.variantKeys;

    Object.entries(props).forEach(([key, value]) => {
        if (variantKeys.includes(key as any)) {
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
