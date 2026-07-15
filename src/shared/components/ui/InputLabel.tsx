interface Props extends React.ComponentProps<"label"> {}

export function InputLabel({ children, ...props }: Props) {
    return (
        <label {...props} className="shrink-0 block text-sm font-semibold text-text-info uppercase cursor-pointer">
            {children}
        </label>
    );
}
