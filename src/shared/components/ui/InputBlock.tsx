interface Props extends React.ComponentProps<"div"> {}

export function InputBlock({ children, ...props }: Props) {
    return <div {...props}>{children}</div>;
}
