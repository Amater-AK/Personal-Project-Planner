import { Outlet, NavLink } from "react-router";

import { ROUTE_PATHS } from "@/app/router/paths.type";

export function MainLayout() {
    return (
        <div className="h-svh flex flex-col">
            <header className="p-2">
                <NavLink to={ROUTE_PATHS.HOME}>Home</NavLink>
                <br />
                <NavLink to={ROUTE_PATHS.PROJECT}>Project</NavLink>
                <br />
                <NavLink to={`${ROUTE_PATHS.PROJECT}/13`}>Project 13</NavLink>
            </header>
            <main className="min-h-0 grow">
                <Outlet />
            </main>
        </div>
    );
}
