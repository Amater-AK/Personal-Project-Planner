import { Link } from "react-router";

import { BsPencilSquare, BsTrash } from "react-icons/bs";

import { useModalStore } from "@/shared/stores/modalStore";
import { useProjectStore } from "../stores/projectStore";

import { Button } from "@/shared/components/ui/Button";
import { ProjectForm } from "./ProjectForm";
import { ConfirmDelete } from "@/shared/components/ui/ConfirmDelete";

import { type Project } from "../types/project.type";
import { toDate } from "@/shared/utils/datetime";

interface Props {
    project: Project;
}

export function ProjectItem({ project }: Props) {
    const openModal = useModalStore((state) => state.openModal);
    const closeModal = useModalStore((state) => state.closeModal);
    const editProject = useProjectStore((state) => state.editProject);
    const deleteProject = useProjectStore((state) => state.deleteProject);

    function handleEdit() {
        openModal(
            <ProjectForm
                data={project}
                onSubmit={(data) => {
                    editProject(project.id, data);
                    closeModal();
                }}
            />,
        );
    }

    function handleDelete() {
        openModal(
            <ConfirmDelete
                onConfirm={() => {
                    deleteProject(project.id);
                    closeModal();
                }}
                onCancel={closeModal}
            />,
        );
    }

    const datetime = toDate(project.createdAt);

    return (
        <li className="relative">
            <Link
                to={`p/${project.id}`}
                className="grow flex items-center gap-6 p-2 pl-4 pr-22 text-input-placeholder bg-input-bg border border-border rounded-medium hover:text-input-text hover:border-input-text transition-colors duration-300"
            >
                <span className="truncate grow">{project.title}</span>
                <time className="text-sm text-text-secondary" dateTime={datetime}>
                    {datetime}
                </time>
            </Link>

            <div className="absolute top-0 bottom-0 right-2 flex items-center gap-2">
                <Button intent="regular" onlyIcon={true} aria-label={`Edit ${project.title}`} onClick={handleEdit}>
                    <BsPencilSquare />
                </Button>
                <Button intent="danger" onlyIcon={true} aria-label={`Delete ${project.title}`} onClick={handleDelete}>
                    <BsTrash />
                </Button>
            </div>
        </li>
    );
}
