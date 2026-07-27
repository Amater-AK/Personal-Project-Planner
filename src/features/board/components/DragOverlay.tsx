import { DragOverlay as DNDDragOverlay } from "@dnd-kit/react";
import { OverlayColumn } from "./OverlayColumn";
import { OverlayCard } from "./OverlayCard";

export function DragOverlay() {
    return (
        <DNDDragOverlay>
            {(source) => {
                if (source.type === "column") {
                    return <OverlayColumn columnId={source.id as string} />;
                } else if (source.type === "card") {
                    return <OverlayCard cardId={source.id as string} />;
                }
            }}
        </DNDDragOverlay>
    );
}
