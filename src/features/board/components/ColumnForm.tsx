import { useState } from "react";

import { InputBlock } from "@/shared/components/ui/InputBlock";
import { InputLabel } from "@/shared/components/ui/InputLabel";
import { Input } from "@/shared/components/ui/Input";
import { InputError } from "@/shared/components/ui/InputError";
import { Button } from "@/shared/components/ui/Button";
import { ColorPicker } from "@/shared/components/ui/ColorPicker";

import { type ColumnEdit } from "@/shared/types/column.type";

interface Props {
    data?: ColumnEdit;
    onSubmit: (data: ColumnEdit) => void;
}

type FormFields = "title" | "color";
// type FormFields = keyof ColumnEdit;

export function ColumnForm({ data, onSubmit }: Props) {
    const [errors, setErrors] = useState<Record<FormFields, string>>({ title: "", color: "" });

    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries()) as unknown as ColumnEdit;

        if (!data.title.trim()) {
            setErrors((state) => ({ ...state, title: "title is required" }));

            return;
        }

        console.log(data);
        onSubmit(data);
    }

    return (
        <form className="grid gap-2" onSubmit={handleSubmit}>
            <h2 className="font-semibold">{data ? "Editing a column" : "Column creation"}</h2>

            <InputBlock>
                <InputLabel htmlFor="title">Title</InputLabel>
                <Input type="text" id="title" name="title" defaultValue={data?.title} />
                <InputError message={errors.title} />
            </InputBlock>

            <InputBlock className="flex items-center justify-between gap-2">
                <InputLabel htmlFor="color">Color</InputLabel>
                <ColorPicker id="color" name="color" defaultColor={data?.color} />
            </InputBlock>

            <div className="flex justify-end">
                <Button type="submit">{data ? "Edit" : "Create"}</Button>
            </div>
        </form>
    );
}
