import { BsPlus } from "react-icons/bs";

import { useModalStore } from "@/shared/stores/modalStore";
import { useProjectStore } from "@/features/projects/stores/projectStore";

import { useProjectSearch } from "@/features/projects/hooks/useProjectSearch";

import { ProjectList } from "@/features/projects/components/ProjectList";
import { ProjectForm } from "@/features/projects/components/ProjectForm";
import { ProjectSearch } from "@/features/projects/components/ProjectSearch";
import { Button } from "@/shared/components/ui/Button";

export function HomePage() {
    const openModal = useModalStore((state) => state.openModal);
    const closeModal = useModalStore((state) => state.closeModal);
    const projects = useProjectStore((state) => state.projects);
    const createProject = useProjectStore((state) => state.createProject);

    const { searchQuery, searchRegex, onChangeQuery } = useProjectSearch();

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

    const filteredProjects = projects.filter((project) => searchRegex.test(project.title));
    const recentProjects = projects
        .toSorted((a, b) => b.lastOpenedAt - a.lastOpenedAt)
        .slice(0, 3)
        .filter((project) => project.lastOpenedAt);

    return (
        <div className="wrapper flex flex-col gap-4 h-full p-2 bg-surface-primary border border-border rounded-medium">
            <div className="flex justify-end items-center gap-2">
                <Button onClick={handleCreate}>
                    <BsPlus />
                    <span>Create new project</span>
                </Button>
            </div>

            {recentProjects.length > 0 && (
                <section className="flex flex-col gap-2 mb-4">
                    <header className="">
                        <h2 className="font-semibold text-lg">Recent projects</h2>
                    </header>

                    <div className="grow overflow-y-auto scrollbar">
                        <ProjectList projects={recentProjects} isRecent={true} />
                    </div>
                </section>
            )}

            <section className="flex flex-col gap-2 min-h-0 h-full">
                <header className="flex justify-between items-center gap-6">
                    <h2 className="font-semibold text-lg">Projects</h2>
                    <ProjectSearch searchQuery={searchQuery} onChangeQuery={onChangeQuery} />
                </header>

                <div className="grow overflow-y-auto scrollbar">
                    <ProjectList projects={filteredProjects} isRecent={false} />
                </div>
            </section>
        </div>
    );
}
