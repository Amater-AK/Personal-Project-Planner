import { ProjectItem } from "./ProjectItem";

import { type Project } from "../types/project.type";

interface Props {
    projects: Project[];
    isRecent: boolean;
}

export function ProjectList({ projects, isRecent = false }: Props) {
    if (!projects.length) {
        return <p className="text-sm text-text-info">There are no projects yet</p>;
    }

    return (
        <ul className="grid gap-1">
            {projects.map((project) => (
                <ProjectItem key={project.id} project={project} isRecent={isRecent} />
            ))}
        </ul>
    );
}
