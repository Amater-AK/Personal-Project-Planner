import { useCallback, useMemo } from "react";
import { useShallow } from "zustand/shallow";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { isSortable } from "@dnd-kit/react/sortable";

import { BsPlus } from "react-icons/bs";

import { useModalStore } from "@/shared/stores/modalStore";
import { useColumnStore } from "@/shared/stores/columnStore";
import { useCardStore } from "@/shared/stores/cardStore";

import { Column } from "./Column";
import { ColumnForm } from "./ColumnForm";
import { Card } from "./Card";
import { Button } from "@/shared/components/ui/Button";

import { type ColumnState } from "@/shared/stores/columnStore";
import { type CardState } from "@/shared/stores/cardStore";
import { type BoardState } from "@/shared/types/board.type";

interface Props {
    projectId: string;
}

export function Board({ projectId }: Props) {
    const openModal = useModalStore((state) => state.openModal);
    const closeModal = useModalStore((state) => state.closeModal);
    const createColumn = useColumnStore((state) => state.createColumn);
    const moveColumn = useColumnStore((state) => state.moveColumn);
    const moveCards = useCardStore((state) => state.moveCards);

    function handleCreate() {
        openModal(
            <ColumnForm
                onSubmit={(data) => {
                    createColumn(projectId, data);
                    closeModal();
                }}
            />,
        );
    }

    const selectColumnsByProjectId = useCallback(
        (state: ColumnState) => Object.values(state.columns).filter((column) => column.projectId === projectId),
        [projectId],
    );
    const columns = useColumnStore(useShallow(selectColumnsByProjectId));
    const orderedColumns = columns.toSorted((a, b) => a.position - b.position);
    // const columnIds = useMemo(() => columns.map((column) => column.id), [columns]);

    // const selectCardsByColumnIds = useCallback(
    //     (state: CardState) => Object.values(state.cards).filter((card) => columnIds.includes(card.columnId)),
    //     [columnIds],
    // );
    // const cards = useCardStore(useShallow(selectCardsByColumnIds));

    // const boardState = useMemo(() => {
    //     const state: BoardState = {};

    //     orderedColumns.forEach((column) => (state[column.id] = []));
    //     cards.toSorted((a, b) => a.position - b.position).forEach((card) => state[card.columnId].push(card));

    //     return state;
    // }, [orderedColumns, cards]);

    return (
        <DragDropProvider
        // onDragOver={(event) => {
        //     const { source } = event.operation;
        //     if (source.type !== "card") return;

        //     const rearrangedBoardState = move(boardState, event);
        //     console.log(rearrangedBoardState);

        //     if (!isSortable(source)) return;
        //     const { initialGroup, group } = source;
        //     moveCards(rearrangedBoardState, initialGroup as string, group as string);
        // }}
        // -----------------
        // onDragOver={(event) => {
        //     // Только карточки
        //     const { source, target } = event.operation;
        //     if (source.type !== "card" || !isSortable(source)) return;
        //     // Если цель карточка, то меняем columnId(в той же колонке ничего не поменяется, а в другой нужно) и др.
        //     if (target.type === "card") {
        //         const { id, initialIndex, index } = source;
        //         moveCard(id as string, {
        //             startIndex: initialIndex,
        //             endIndex: index,
        //             columnId: target.id as string,
        //         });
        //     }
        //     // Если цель колонка (пустая или не полная), то меняем columnId
        //     // if (target.type === "column") {
        //     //     const { id } = source;
        //     //     moveCardToEmpty(id as string, target.id as string);
        //     // }
        // }}
        // onDragEnd={(event) => {
        //     // Только колонки
        //     const { source } = event.operation;
        //     if (event.canceled || source.type !== "column" || !isSortable(source)) return;

        //     const { initialIndex, index, id } = source;
        //     moveColumn(id as string, initialIndex, index);
        // }}
        // onDragOver={(event) => {
        //     const { source } = event.operation;
        //     if (source.type !== "card" || !isSortable(source)) return;

        //     const { id, initialIndex, index, initialGroup, group } = source;
        //     if (initialGroup == null || group == null) return;

        //     moveCard(id as string, {
        //         startIndex: initialIndex,
        //         endIndex: index,
        //         startColumnId: initialGroup as string,
        //         endColumnId: group as string,
        //     });
        // }}
        // onDragEnd={(event) => {
        //     const { source } = event.operation;
        //     if (event.canceled || source.type !== "column" || !isSortable(source)) return;

        //     const { initialIndex, index, id } = source;
        //     moveColumn(id as string, initialIndex, index);
        // }}
        >
            <section className="scrollbar grow flex gap-4 min-h-0 overflow-x-auto">
                {orderedColumns.map((column, index) => (
                    <Column key={column.id} column={column} index={index} />
                ))}
                <div>
                    <Button intent="secondary" onClick={handleCreate}>
                        <BsPlus />
                        <span>Create a column</span>
                    </Button>
                </div>
            </section>
        </DragDropProvider>
    );
}
