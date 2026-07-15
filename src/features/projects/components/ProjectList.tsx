import { ProjectItem } from "./ProjectItem";

import { type Project } from "../types/project.type";

interface Props {
    projects: Project[];
}

export function ProjectList({ projects }: Props) {
    if (!projects.length) {
        return <p className="text-sm text-text-info">There are no projects yet</p>;
    }

    return (
        <ul className="grid gap-1">
            {projects.map((project) => (
                <ProjectItem key={project.id} project={project} />
            ))}
        </ul>
    );
}
