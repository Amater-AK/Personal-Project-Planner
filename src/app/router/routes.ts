import { MainLayout } from "@/layouts/MainLayout";

import { NotFoundPage } from "@/pages/NotFoundPage";
import { HomePage } from "@/pages/HomePage";
import { ProjectPage } from "@/pages/ProjectPage";

import { ROUTE_PATHS } from "./paths";

export const routes = [
    {
        Component: MainLayout,
        children: [
            {
                path: ROUTE_PATHS.HOME,
                Component: HomePage,
            },
            {
                path: `${ROUTE_PATHS.PROJECT}/:pId`,
                Component: ProjectPage,
            },

            {
                path: "*",
                Component: NotFoundPage,
            },
        ],
    },
];
