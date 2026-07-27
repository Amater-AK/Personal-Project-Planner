import { useSortable } from "@dnd-kit/react/sortable";
import { CollisionPriority } from "@dnd-kit/abstract";

import { BsPencilSquare, BsTrash } from "react-icons/bs";

import { useModalStore } from "@/shared/stores/modalStore";
import { useBoardStore } from "@/shared/stores/boardStore";

import { Button } from "@/shared/components/ui/Button";
import { CardForm } from "./CardForm";
import { ConfirmDelete } from "@/shared/components/ui/ConfirmDelete";

import { toDate } from "@/shared/utils/datetime";
import { type Card } from "@/shared/types/card.type";

interface Props {
    cardId: string;
    index: number;
    columnId: string;
}

export function Card({ cardId, index, columnId }: Props) {
    const { ref, isDragging } = useSortable({
        id: cardId,
        index,
        type: "card",
        accept: "card",
        group: columnId,
        collisionPriority: CollisionPriority.Low,
    });
    const openModal = useModalStore((state) => state.openModal);
    const closeModal = useModalStore((state) => state.closeModal);
    const editCard = useBoardStore((state) => state.editCard);
    const deleteCard = useBoardStore((state) => state.deleteCard);
    const deleteCardFromColumn = useBoardStore((state) => state.deleteCardFromColumn);
    const card = useBoardStore((state) => state.cards[cardId]);

    function handleEdit() {
        openModal(
            <CardForm
                data={card}
                onSubmit={(data) => {
                    editCard(card.id, data);
                    closeModal();
                }}
            />,
        );
    }

    function handleDelete() {
        openModal(
            <ConfirmDelete
                onConfirm={() => {
                    deleteCardFromColumn(card.columnId, card.id);
                    deleteCard(card.id);
                    closeModal();
                }}
                onCancel={closeModal}
            />,
        );
    }

    const datetime = toDate(card.createdAt);

    if (isDragging) {
        return (
            <article ref={ref} className="p-2 border border-outline rounded-medium">
                <div className="opacity-0 pointer-events-none">
                    <div className="whitespace-pre-wrap">{card.text}</div>
                    <footer>
                        <time className="grow text-xs text-text-info" dateTime={datetime}>
                            {datetime}
                        </time>
                    </footer>
                </div>
            </article>
        );
    }

    return (
        <article
            ref={ref}
            className="group/card relative p-2 bg-input-bg border border-input-border rounded-medium cursor-grab"
        >
            <div className="whitespace-pre-wrap">{card.text}</div>
            <footer>
                <time className="grow text-xs text-text-info" dateTime={datetime}>
                    {datetime}
                </time>
            </footer>

            <div className="absolute bottom-2 right-2 flex items-center gap-2 opacity-0 pointer-events-none transition-opacity duration-300 group-hover/card:opacity-100 group-hover/card:pointer-events-auto">
                <Button intent="regular" onlyIcon={true} onClick={handleEdit}>
                    <BsPencilSquare />
                </Button>
                <Button intent="danger" onlyIcon={true} onClick={handleDelete}>
                    <BsTrash />
                </Button>
            </div>
        </article>
    );
}
