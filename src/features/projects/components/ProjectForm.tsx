import { useState } from "react";

import { InputBlock } from "@/shared/components/ui/InputBlock";
import { InputLabel } from "@/shared/components/ui/InputLabel";
import { Input } from "@/shared/components/ui/Input";
import { InputError } from "@/shared/components/ui/InputError";
import { Button } from "@/shared/components/ui/Button";

import { type ProjectEdit } from "../types/project.type";

interface Props {
    data?: ProjectEdit;
    onSubmit: (data: ProjectEdit) => void;
}

type FormFields = "title";

export function ProjectForm({ data, onSubmit }: Props) {
    const [errors, setErrors] = useState<Record<FormFields, string>>({ title: "" });

    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries()) as unknown as ProjectEdit;

        if (!data.title.trim()) {
            setErrors((state) => ({ ...state, title: "title is required" }));

            return;
        }

        onSubmit(data);
    }

    return (
        <form className="grid gap-2" onSubmit={handleSubmit}>
            <h2 className="font-semibold">{data ? "Editing a project" : "Project creation"}</h2>

            <InputBlock>
                <InputLabel htmlFor="title">Title</InputLabel>
                <Input type="text" id="title" name="title" defaultValue={data?.title} />
                <InputError message={errors.title} />
            </InputBlock>

            <div className="flex justify-end">
                <Button type="submit">{data ? "Edit" : "Create"}</Button>
            </div>
        </form>
    );
}
