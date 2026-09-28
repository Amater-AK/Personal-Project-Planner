import { BsArrowLeftShort } from "react-icons/bs";

import { LinkButton } from "@/shared/components/ui/LinkButton";

import { ROUTE_PATHS } from "@/app/router/paths";

export function NotFoundPage() {
    return (
        <div className="flex flex-col justify-center items-center h-full px-2">
            <div className="flex flex-col gap-2 p-2 bg-surface-primary border border-border rounded-medium">
                <h1>Page not found.</h1>

                <div>
                    <LinkButton to={ROUTE_PATHS.HOME} intent="secondary">
                        <BsArrowLeftShort />
                        <span>To projects</span>
                    </LinkButton>
                </div>
            </div>
        </div>
    );
}
