import { useState } from "react";

import { InputBlock } from "./InputBlock";

interface RadioGroupItem {
    id: string;
    content: React.ReactNode;
    value: string;
}

interface RadioGroupProps {
    defaultValue: string;
    name: string;
    items: RadioGroupItem[];
    onChange?: (value: string) => void;
}

export function InputRadioGroup({ defaultValue, name, items, onChange }: RadioGroupProps) {
    const [selectedValue, setSelectedValue] = useState(() => defaultValue);

    function handleChange(value: string) {
        setSelectedValue(value);
        onChange?.(value);
    }

    return (
        <InputBlock className="flex items-center gap-4">
            {items.map((item) => (
                <RadioItem
                    key={item.id}
                    name={name}
                    data={item}
                    checked={item.value === selectedValue}
                    onChange={handleChange}
                />
            ))}
        </InputBlock>
    );
}

interface RadioItemProps {
    name: string;
    data: RadioGroupItem;
    checked: boolean;
    onChange?: (value: string) => void;
}

function RadioItem({ name, data, checked, onChange }: RadioItemProps) {
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;

        onChange?.(value);
    }

    return (
        <div>
            <input
                type="radio"
                className="hidden"
                id={data.id}
                name={name}
                value={data.value}
                checked={checked}
                onChange={handleChange}
            />
            <label htmlFor={data.id} className={``}>
                {data.content}
            </label>
        </div>
    );
}
