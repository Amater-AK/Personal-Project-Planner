import { useState } from "react";

import { InputBlock } from "./InputBlock";
import { InputLabel } from "./InputLabel";

interface ColorPickerItem {
    id: string;
    value: string;
}

interface ColorPickerProps {
    defaultValue: string;
    name: string;
    items: ColorPickerItem[];
}

export function InputColorPicker({ defaultValue, name, items }: ColorPickerProps) {
    const [selectedValue, setSelectedValue] = useState(() => defaultValue);

    function handleChange(value: string) {
        setSelectedValue(value);
    }

    return (
        <InputBlock>
            <InputLabel>Color</InputLabel>

            <div className="flex items-center gap-2">
                {items.map((item) => (
                    <ColorItem
                        key={item.id}
                        name={name}
                        data={item}
                        checked={item.value === selectedValue}
                        onChange={handleChange}
                    />
                ))}
            </div>
        </InputBlock>
    );
}

interface ColorItemProps {
    name: string;
    data: ColorPickerItem;
    checked: boolean;
    onChange: (value: string) => void;
}

function ColorItem({ name, data, checked, onChange }: ColorItemProps) {
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;

        onChange(value);
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
            <label
                htmlFor={data.id}
                className={`block size-10 border  hover:border-button-regular-border-hover rounded-medium cursor-pointer transition-colors duration-300 ${checked ? "border-button-regular-border-hover" : "border-button-regular-border"}`}
                style={{ backgroundColor: data.value || "transparent" }}
            ></label>
        </div>
    );
}
