import { useCallback } from "react";
import { useShallow } from "zustand/shallow";

import { BsPlus } from "react-icons/bs";

import { useModalStore } from "@/shared/stores/modalStore";
import { useColumnStore } from "@/shared/stores/columnStore";

import { Column } from "./Column";
import { ColumnForm } from "./ColumnForm";
import { Button } from "@/shared/components/ui/Button";

import { type ColumnState } from "@/shared/stores/columnStore";

interface Props {
    projectId: string;
}

export function Board({ projectId }: Props) {
    const openModal = useModalStore((state) => state.openModal);
    const closeModal = useModalStore((state) => state.closeModal);
    const createColumn = useColumnStore((state) => state.createColumn);
    const selectColumnsByProjectId = useCallback(
        (state: ColumnState) => Object.values(state.columns).filter((column) => column.projectId === projectId),
        [projectId],
    );

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

    const columns = useColumnStore(useShallow(selectColumnsByProjectId));

    return (
        <section className="scrollbar grow flex gap-4 min-h-0 overflow-x-auto">
            {columns.map((column) => (
                <Column key={column.id} column={column} />
            ))}
            <div>
                <Button intent="secondary" onClick={handleCreate}>
                    <BsPlus />
                    <span>Create a column</span>
                </Button>
            </div>
        </section>
    );
}
