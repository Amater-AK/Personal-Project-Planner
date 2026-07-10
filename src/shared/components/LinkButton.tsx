import { Link } from "react-router";

import { buttonStyles, type ButtonVariants } from "../styles/buttonStyles";

interface Props extends React.ComponentProps<"a">, ButtonVariants {
    to: string;
}

export function LinkButton({ children, className, ...props }: Props) {
    return (
        <Link className={buttonStyles({ ...props, className })} {...props}>
            {children}
        </Link>
    );
}
