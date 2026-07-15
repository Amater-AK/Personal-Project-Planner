import { Outlet } from "react-router";

import { Header } from "@/shared/components/Header";

export function MainLayout() {
    return (
        <div className="h-svh flex flex-col">
            <Header />

            <main className="min-h-0 grow pb-2">
                <Outlet />
            </main>
        </div>
    );
}
