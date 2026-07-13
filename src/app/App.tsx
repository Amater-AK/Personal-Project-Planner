import { RouterProvider, createBrowserRouter } from "react-router";
import { ErrorBoundary } from "react-error-boundary";

import { ModalContainer } from "./providers/ModalContainer";

import { routes } from "./router/routes";

const router = createBrowserRouter(routes);

export function App() {
    return (
        <ErrorBoundary fallback="Global Error">
            <ModalContainer />
            <RouterProvider router={router} />
        </ErrorBoundary>
    );
}
