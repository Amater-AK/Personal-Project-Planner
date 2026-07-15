import { Button } from "./Button";

interface Props {
    onConfirm: () => void;
    onCancel: () => void;
}

export function ConfirmDelete({ onConfirm, onCancel }: Props) {
    return (
        <div className="grid gap-4">
            <p>Are you sure you want to delete?</p>

            <div className="flex justify-end items-center gap-2">
                <Button intent="primary" onClick={onConfirm}>
                    Yes
                </Button>
                <Button intent="regular" onClick={onCancel}>
                    Cancel
                </Button>
            </div>
        </div>
    );
}
