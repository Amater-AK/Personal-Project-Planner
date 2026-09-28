export function Input(props: React.ComponentProps<"input">) {
    return (
        <input
            className="w-full px-2 py-1 text-input-text bg-input-bg border border-input-border rounded-medium placeholder:text-input-placeholder"
            {...props}
        />
    );
}
