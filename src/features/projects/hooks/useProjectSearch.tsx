import { useState, useMemo } from "react";

export function useProjectSearch() {
    const [searchQuery, setSearchQuery] = useState("");
    const escapedQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = useMemo(() => {
        return new RegExp(escapedQuery, "i");
    }, [escapedQuery]);

    return {
        searchQuery: searchQuery,
        searchRegex: regex,
        onChangeQuery: setSearchQuery,
    };
}
