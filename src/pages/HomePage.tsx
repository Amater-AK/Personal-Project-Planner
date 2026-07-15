import { BsPlusSquare } from "react-icons/bs";

import { useModalStore } from "@/shared/stores/modalStore";
import { useProjectStore } from "@/features/projects/stores/projectStore";

import { ProjectList } from "@/features/projects/components/ProjectList";
import { ProjectForm } from "@/features/projects/components/ProjectForm";
import { Button } from "@/shared/components/ui/Button";

export function HomePage() {
    const openModal = useModalStore((state) => state.openModal);
    const closeModal = useModalStore((state) => state.closeModal);
    const projects = useProjectStore((state) => state.projects);
    const createProject = useProjectStore((state) => state.createProject);

    function handleCreate() {
        openModal(
            <ProjectForm
                onSubmit={(data) => {
                    createProject(data);
                    closeModal();
                }}
            />,
        );
    }

    return (
        <div className="wrapper flex flex-col gap-4 h-full p-2 bg-surface-primary border border-border rounded-medium">
            <div className="flex justify-end items-center gap-2">
                <Button onClick={handleCreate}>
                    <BsPlusSquare />
                    <span>Create new project</span>
                </Button>
            </div>
            <section className="flex flex-col gap-2 min-h-0 h-full">
                <header className="">
                    <h1 className="font-semibold text-lg">Projects</h1>
                </header>

                <div className="grow overflow-y-auto scrollbar">
                    <ProjectList projects={projects} />
                </div>
            </section>
        </div>
    );
}
