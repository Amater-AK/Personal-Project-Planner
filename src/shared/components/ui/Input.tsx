interface Props extends React.ComponentProps<"input"> {}

export function Input(props: Props) {
    return (
        <input
            className="w-full px-2 py-1 text-input-text bg-input-bg border border-input-border rounded-medium placeholder:text-input-placeholder"
            {...props}
        />
    );
}
