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
        <ul>
            {projects.map((project) => (
                <li key={project.id}>
                    <ProjectItem project={project} />
                </li>
            ))}
        </ul>
    );
}
