import { useCallback } from "react";
import { useShallow } from "zustand/shallow";
import { useDroppable } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { CollisionPriority } from "@dnd-kit/abstract";

import { BsPlus } from "react-icons/bs";

import { useModalStore } from "@/shared/stores/modalStore";
import { useCardStore } from "@/shared/stores/cardStore";

import { ColumnHeader } from "./ColumnHeader";
import { Button } from "@/shared/components/ui/Button";
import { CardForm } from "./CardForm";
import { Card } from "./Card";

import { type Column } from "@/shared/types/column.type";
import { type CardState } from "@/shared/stores/cardStore";

interface Props {
    column: Column;
    index: number;
}

export function Column({ column, index }: Props) {
    const { ref, isDragging } = useSortable({
        id: column.id,
        index,
        type: "column",
        accept: ["card", "column"],
        collisionPriority: CollisionPriority.High,
    });
    const openModal = useModalStore((state) => state.openModal);
    const closeModal = useModalStore((state) => state.closeModal);
    const createCard = useCardStore((state) => state.createCard);

    function handleCreate() {
        openModal(
            <CardForm
                onSubmit={(data) => {
                    createCard(column.id, data);
                    closeModal();
                }}
            />,
        );
    }

    const selectCardsByColumnId = useCallback(
        (state: CardState) => Object.values(state.cards).filter((card) => card.columnId === column.id),
        [column],
    );
    const cards = useCardStore(useShallow(selectCardsByColumnId));
    const orderedCards = cards.toSorted((a, b) => a.position - b.position);

    return (
        <article
            ref={ref}
            className={`shrink-0 flex flex-col gap-4 w-80 p-2 bg-surface-primary border border-border rounded-medium ${isDragging ? "border-green-500" : ""}`}
        >
            <ColumnHeader column={column} handleRef={null} />
            <p className="text-xs">{column.id}</p>
            <div className="scrollbar grow flex flex-col gap-2 overflow-y-auto">
                {orderedCards.map((card, index) => (
                    <Card key={card.id} card={card} index={index} columnId={column.id} />
                ))}
            </div>
            <footer>
                <Button intent="regular" width="full" onClick={handleCreate}>
                    <BsPlus />
                    <span>Add a card</span>
                </Button>
            </footer>
        </article>
    );
}
