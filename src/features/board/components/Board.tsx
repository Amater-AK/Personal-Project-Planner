import { useCallback, useMemo } from "react";
import { useShallow } from "zustand/shallow";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";

import { BsPlus } from "react-icons/bs";

import { useModalStore } from "@/shared/stores/modalStore";
import { useBoardStore } from "@/shared/stores/boardStore";

import { Column } from "./Column";
import { ColumnForm } from "./ColumnForm";
import { Button } from "@/shared/components/ui/Button";

import { type BoardState } from "@/shared/stores/boardStore";
import { type BoardState as BoardType } from "@/shared/types/board.type";

interface Props {
    projectId: string;
}

export function Board({ projectId }: Props) {
    const openModal = useModalStore((state) => state.openModal);
    const closeModal = useModalStore((state) => state.closeModal);
    const createColumn = useBoardStore((state) => state.createColumn);
    const moveColumns = useBoardStore((state) => state.moveColumns);
    const moveCards = useBoardStore((state) => state.moveCards);

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
        (state: BoardState) => Object.values(state.columns).filter((column) => column.projectId === projectId),
        [projectId],
    );
    const columns = useBoardStore(useShallow(selectColumnsByProjectId));

    const boardState = useMemo(() => {
        const state: BoardType = {};
        columns.forEach((column) => (state[column.id] = [...column.cardIds]));

        return state;
    }, [columns]);
    const orderedColumnIds = useMemo(
        () => columns.toSorted((a, b) => a.position - b.position).map((column) => column.id),
        [columns],
    );

    return (
        <DragDropProvider
            onDragOver={(event) => {
                const { source } = event.operation;
                if (source?.type === "column") return;

                moveCards(move(boardState, event));
            }}
            onDragEnd={(event) => {
                const { source } = event.operation;
                if (event.canceled || source.type !== "column") return;

                moveColumns(move(orderedColumnIds, event));
            }}
        >
            <section className="scrollbar grow flex gap-4 min-h-0 overflow-x-auto">
                {orderedColumnIds.map((columnId, index) => (
                    <Column key={columnId} columnId={columnId} index={index} />
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
