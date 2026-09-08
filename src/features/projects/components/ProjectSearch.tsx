import { BsX } from "react-icons/bs";

import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";

interface Props {
    searchQuery: string;
    onChangeQuery: (query: string) => void;
}

export function ProjectSearch({ searchQuery, onChangeQuery }: Props) {
    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        const query = event.target.value.trim();

        onChangeQuery(query);
    }

    function onClear() {
        onChangeQuery("");
    }

    return (
        <div className="flex items-center gap-1">
            <Input type="text" id="search" name="search" placeholder="Search" value={searchQuery} onChange={onChange} />
            <Button intent="regular" onlyIcon={true} aria-label="Clear search" onClick={onClear}>
                <BsX />
            </Button>
        </div>
    );
}
