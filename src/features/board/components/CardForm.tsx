import { useState, useMemo } from "react";

import { InputBlock } from "@/shared/components/ui/InputBlock";
import { InputLabel } from "@/shared/components/ui/InputLabel";
import { InputTextarea } from "@/shared/components/ui/InputTextarea";
import { InputError } from "@/shared/components/ui/InputError";
import { Button } from "@/shared/components/ui/Button";
import { InputColorPicker } from "@/shared/components/ui/InputColorPicker";

import { type CardEdit } from "@/shared/types/card.type";

import { COLORS } from "@/app/colors";

interface Props {
    data?: CardEdit;
    onSubmit: (data: CardEdit) => void;
}

type FormFields = "text" | "color";
// type FormFields = keyof ColumnEdit;

export function CardForm({ data, onSubmit }: Props) {
    const [errors, setErrors] = useState<Record<FormFields, string>>({ text: "", color: "" });

    const colorItems = useMemo(() => {
        return [{ id: "Default", value: "" }, ...COLORS];
    }, []);

    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries()) as unknown as CardEdit;

        if (!data.text.trim()) {
            setErrors((state) => ({ ...state, text: "text is required" }));

            return;
        }

        onSubmit(data);
    }

    return (
        <form className="grid gap-2" onSubmit={handleSubmit}>
            <h2 className="font-semibold">{data ? "Editing a card" : "Card creation"}</h2>

            <InputBlock>
                <InputLabel htmlFor="text">text</InputLabel>
                <InputTextarea id="text" name="text" rows={3} defaultValue={data?.text} />
                <InputError message={errors.text} />
            </InputBlock>

            <InputColorPicker defaultValue={data?.color} name="color" items={colorItems} />

            <div className="flex justify-end">
                <Button type="submit">{data ? "Edit" : "Create"}</Button>
            </div>
        </form>
    );
}
