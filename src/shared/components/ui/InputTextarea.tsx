interface Props extends React.ComponentProps<"textarea"> {}

export function InputTextarea({ ...props }: Props) {
    return (
        <textarea
            className="w-full px-2 py-1 text-input-text bg-input-bg border border-input-border rounded-medium resize-none placeholder:text-input-placeholder"
            {...props}
        ></textarea>
    );
}
