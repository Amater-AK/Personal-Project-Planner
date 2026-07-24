import { useSortable } from "@dnd-kit/react/sortable";
import { CollisionPriority } from "@dnd-kit/abstract";

import { BsPlus } from "react-icons/bs";

import { useModalStore } from "@/shared/stores/modalStore";
import { useBoardStore } from "@/shared/stores/boardStore";

import { ColumnHeader } from "./ColumnHeader";
import { Button } from "@/shared/components/ui/Button";
import { CardForm } from "./CardForm";
import { Card } from "./Card";

import { type Column } from "@/shared/types/column.type";

interface Props {
    columnId: string;
    index: number;
}

export function Column({ columnId, index }: Props) {
    const { ref, isDragging } = useSortable({
        id: columnId,
        index,
        type: "column",
        accept: ["card", "column"],
        collisionPriority: CollisionPriority.Low,
    });
    const openModal = useModalStore((state) => state.openModal);
    const closeModal = useModalStore((state) => state.closeModal);
    const addCardToColumn = useBoardStore((state) => state.addCardToColumn);
    const createCard = useBoardStore((state) => state.createCard);
    const column = useBoardStore((state) => state.columns[columnId]);

    function handleCreate() {
        openModal(
            <CardForm
                onSubmit={(data) => {
                    const cardId = createCard(column.id, data);
                    addCardToColumn(column.id, cardId);
                    closeModal();
                }}
            />,
        );
    }

    return (
        <article
            ref={ref}
            className={`shrink-0 flex flex-col gap-4 w-80 p-2 bg-surface-primary border border-border rounded-medium ${isDragging ? "border-green-500" : ""}`}
        >
            <ColumnHeader column={column} handleRef={null} />
            <p className="text-xs">{column.id}</p>
            <div className="scrollbar grow flex flex-col gap-2 overflow-y-auto">
                {column.cardIds.map((cardId, index) => (
                    <Card key={cardId} cardId={cardId} index={index} columnId={column.id} />
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
