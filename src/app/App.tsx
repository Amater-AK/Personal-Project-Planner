export function App() {
    return (
        <div className="bg-surface-primary m-6 p-2 border border-border rounded-large">
            <h1 className="text-text-primary">Header</h1>
            <p className="text-text-secondary">Secondary text</p>
            <p className="text-text-info">Info text</p>
            <input
                type="text"
                className="p-1 text-input-text bg-input-bg border border-input-border placeholder:text-input-placeholder"
                placeholder="placeholder"
            />
            <br />
            <br />
            <input
                type="text"
                className="p-1 text-input-text bg-input-bg border border-input-border placeholder:text-input-placeholder"
                defaultValue="default"
            />
            <br />
            <br />
            <button className="p-1 text-button-primary-text bg-button-primary-bg border border-button-primary-border hover:text-button-primary-text-hover hover:bg-button-primary-bg-hover rounded-medium">
                Primary button
            </button>
        </div>
    );
}
