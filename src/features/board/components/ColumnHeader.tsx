import { BsThreeDots, BsPencilSquare, BsTrash } from "react-icons/bs";

import { useModalStore } from "@/shared/stores/modalStore";
import { useColumnStore } from "@/shared/stores/columnStore";

import { ActionMenu } from "@/shared/components/ui/ActionMenu";
import { Button } from "@/shared/components/ui/Button";
import { ColumnForm } from "./ColumnForm";
import { ConfirmDelete } from "@/shared/components/ui/ConfirmDelete";

import { type Column } from "@/shared/types/column.type";
import { buttonStyles } from "@/shared/styles/buttonStyles";

interface Props {
    column: Column;
}

export function ColumnHeader({ column }: Props) {
    const openModal = useModalStore((state) => state.openModal);
    const closeModal = useModalStore((state) => state.closeModal);
    const editColumn = useColumnStore((state) => state.editColumn);
    const deleteColumn = useColumnStore((state) => state.deleteColumn);

    function handleEdit() {
        openModal(
            <ColumnForm
                data={column}
                onSubmit={(data) => {
                    editColumn(column.id, data);
                    closeModal();
                }}
            />,
        );
    }

    function handleDelete() {
        openModal(
            <ConfirmDelete
                onConfirm={() => {
                    deleteColumn(column.id);
                    closeModal();
                }}
                onCancel={closeModal}
            />,
        );
    }

    return (
        <header className="flex items-center gap-2">
            <span className="inline-block px-2 text-lg text-text-info cursor-grab">⋮⋮</span>
            <h2 className="truncate grow font-semibold">{column.title}</h2>

            <ActionMenu
                className={(isOpen) =>
                    `top-0 left-full min-w-40 p-1 bg-surface-primary border border-border rounded-medium translate-x-2 shadow-md transition-all duration-300 ${isOpen ? "translate-y-0" : "opacity-0 translate-y-10"}`
                }
                trigger={
                    <Button intent="regular" onlyIcon={true}>
                        <BsThreeDots />
                    </Button>
                }
            >
                <ActionMenu.ActionButton
                    className={buttonStyles({ intent: "regular", width: "full" })}
                    onClick={handleEdit}
                >
                    <BsPencilSquare />
                    <span>Edit</span>
                </ActionMenu.ActionButton>
                <ActionMenu.ActionButton
                    className={buttonStyles({ intent: "danger", width: "full" })}
                    onClick={handleDelete}
                >
                    <BsTrash />
                    <span>Delete</span>
                </ActionMenu.ActionButton>
            </ActionMenu>
        </header>
    );
}
