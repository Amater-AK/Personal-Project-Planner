import { useState } from "react";

import { InputBlock } from "@/shared/components/ui/InputBlock";
import { InputLabel } from "@/shared/components/ui/InputLabel";
import { InputTextarea } from "@/shared/components/ui/InputTextarea";
import { InputError } from "@/shared/components/ui/InputError";
import { Button } from "@/shared/components/ui/Button";

import { type CardEdit } from "@/shared/types/card.type";

interface Props {
    data?: CardEdit;
    onSubmit: (data: CardEdit) => void;
}

type FormFields = "text";

export function CardForm({ data, onSubmit }: Props) {
    const [errors, setErrors] = useState<Record<FormFields, string>>({ text: "" });

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

            <div className="flex justify-end">
                <Button type="submit">{data ? "Edit" : "Create"}</Button>
            </div>
        </form>
    );
}
