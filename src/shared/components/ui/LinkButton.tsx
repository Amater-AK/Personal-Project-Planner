import { Link } from "react-router";

import { buttonStyles, type ButtonVariants } from "@/shared/styles/buttonStyles";

interface Props extends React.ComponentProps<"a">, ButtonVariants {
    to: string;
}

type ButtonVariantsKeys = keyof ButtonVariants;

export function LinkButton({ children, className, to, ...props }: Props) {
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
        <Link className={buttonStyles({ ...variantProps, className })} to={to} {...nativeProps}>
            {children}
        </Link>
    );
}
