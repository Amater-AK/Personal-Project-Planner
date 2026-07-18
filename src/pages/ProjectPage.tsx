import { useParams } from "react-router";

import { BsArrowLeftShort } from "react-icons/bs";

import { useProjectStore } from "@/features/projects/stores/projectStore";

import { LinkButton } from "@/shared/components/ui/LinkButton";
import { Board } from "@/features/board/components/Board";

import { ROUTE_PATHS } from "@/app/router/paths";

export function ProjectPage() {
    const { pId } = useParams();
    const getProject = useProjectStore((state) => state.getProject);

    const project = getProject(pId);

    return (
        <div className="flex flex-col gap-4 h-full px-2">
            <header className="grid grid-cols-3 items-center gap-4">
                <div>
                    <LinkButton to={ROUTE_PATHS.HOME} intent="secondary">
                        <BsArrowLeftShort />
                        <span>Back</span>
                    </LinkButton>
                </div>

                <h1 className="truncate w-full text-center text-text-info">{project.title}</h1>
            </header>

            <Board projectId={project.id} />
        </div>
    );
}
