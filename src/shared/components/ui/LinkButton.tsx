import { Link } from "react-router";

import { buttonStyles, type ButtonVariants } from "@/shared/styles/buttonStyles";

interface Props extends React.ComponentProps<"a">, ButtonVariants {
    to: string;
}

export function LinkButton({ children, className, to, ...props }: Props) {
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
        <Link className={buttonStyles({ ...variantProps, className })} to={to} {...nativeProps}>
            {children}
        </Link>
    );
}
