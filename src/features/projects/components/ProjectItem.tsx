import { BsPencilSquare, BsTrash } from "react-icons/bs";

import { Button } from "@/shared/components/ui/Button";

import { type Project } from "../types/project.type";
import { toDate } from "@/shared/utils/datetime";

interface Props {
    project: Project;
}

export function ProjectItem({ project }: Props) {
    const datetime = toDate(project.createdAt);

    return (
        <div className="flex items-center gap-4">
            <span className="truncate grow">{project.title}</span>

            <time className="text-sm text-text-secondary" dateTime={datetime}>
                {datetime}
            </time>

            <div className="flex items-center gap-2">
                <Button intent="regular" onlyIcon={true}>
                    <BsPencilSquare />
                </Button>
                <Button intent="danger" onlyIcon={true}>
                    <BsTrash />
                </Button>
            </div>
        </div>
    );
}
