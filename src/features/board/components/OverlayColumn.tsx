import { useBoardStore } from "@/shared/stores/boardStore";

import { ColumnHeader } from "./ColumnHeader";
import { OverlayCard } from "./OverlayCard";

interface Props {
    columnId: string;
}

export function OverlayColumn({ columnId }: Props) {
    const column = useBoardStore((state) => state.columns[columnId]);

    return (
        <article
            className={`shrink-0 flex flex-col gap-4 ${column.isCollapsed ? "w-20" : "w-80"} h-full p-2 bg-surface-primary border border-border rounded-medium`}
            style={column.color ? { backgroundColor: column.color } : undefined}
        >
            <ColumnHeader column={column} handleRef={null} />

            {!column.isCollapsed && (
                <div className="scrollbar grow flex flex-col gap-2 overflow-y-auto">
                    {column.cardIds.map((cardId) => (
                        <OverlayCard key={cardId} cardId={cardId} />
                    ))}
                </div>
            )}
        </article>
    );
}
