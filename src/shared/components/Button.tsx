import { buttonStyles, type ButtonVariants } from "../styles/buttonStyles";

interface Props extends React.ComponentProps<"button">, ButtonVariants {}

export function Button({ children, className, ...props }: Props) {
    return (
        <button className={buttonStyles({ ...props, className })} {...props}>
            {children}
        </button>
    );
}
