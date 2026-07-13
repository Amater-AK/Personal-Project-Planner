import { NavLink } from "react-router";

import { Logo } from "./Logo";

import { ROUTE_PATHS } from "@/app/router/paths";

export function Header() {
    return (
        <header className="flex items-center gap-6 p-2">
            <Logo />

            <NavLink to={ROUTE_PATHS.HOME}>Home</NavLink>
            <NavLink to={ROUTE_PATHS.PROJECT}>Project</NavLink>
            <NavLink to={`${ROUTE_PATHS.PROJECT}/13`}>Project 13</NavLink>
        </header>
    );
}
