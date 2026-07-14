import { useModalStore } from "@/shared/stores/modalStore";

import { ProjectList } from "@/features/projects/components/ProjectList";

import { type Project } from "@/features/projects/types/project.type";

export function HomePage() {
    const openModal = useModalStore((state) => state.openModal);

    function handleTestModal() {
        openModal(<p>Test text</p>);
    }

    const PROJECTS: Project[] = [
        { id: "1", title: "project 1", createdAt: 1784031001246 },
        { id: "2", title: "project 2", createdAt: 1784030001246 },
    ];

    return (
        <div>
            <ProjectList projects={PROJECTS} />
        </div>
    );
}
