import { useBoardStore } from "@/shared/stores/boardStore";

import { ColumnHeader } from "./ColumnHeader";
import { OverlayCard } from "./OverlayCard";

interface Props {
    columnId: string;
}

export function OverlayColumn({ columnId }: Props) {
    const column = useBoardStore((state) => state.columns[columnId]);

    return (
        <article className="shrink-0 flex flex-col gap-4 w-80 p-2 bg-surface-primary border border-border rounded-medium">
            <ColumnHeader column={column} handleRef={null} />

            <div className="scrollbar grow flex flex-col gap-2 overflow-y-auto">
                {column.cardIds.map((cardId) => (
                    <OverlayCard key={cardId} cardId={cardId} />
                ))}
            </div>
        </article>
    );
}
