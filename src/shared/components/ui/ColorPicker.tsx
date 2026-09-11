import { useState, useRef } from "react";

import { BsX } from "react-icons/bs";

import { Input } from "./Input";
import { Button } from "./Button";

interface Props {
    id: string;
    name: string;
    defaultColor: string;
}

export function ColorPicker({ id, name, defaultColor }: Props) {
    const [color, setColor] = useState(defaultColor || "#FFFFFF");
    const inputRef = useRef(null);

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;

        inputRef.current.value = value;
        setColor(value);
    }

    function onClear() {
        inputRef.current.value = "";
        setColor("#FFFFFF");
    }

    return (
        <div className="flex items-center gap-2 w-40">
            <Input ref={inputRef} type="hidden" name={name} defaultValue={defaultColor} />
            <Input type="color" id={id} value={color} onChange={onChange} />
            <Button type="button" intent="regular" onlyIcon={true} aria-label="Clear color" onClick={onClear}>
                <BsX />
            </Button>
        </div>
    );
}
