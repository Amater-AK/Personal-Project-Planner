import { RouterProvider, createBrowserRouter } from "react-router";
import { ErrorBoundary } from "react-error-boundary";

import { ModalProvider } from "./providers/ModalProvider";
import { ThemeProvider } from "./providers/ThemeProvider";

import { routes } from "./router/routes";

const router = createBrowserRouter(routes);

export function App() {
    return (
        <ErrorBoundary fallback="Global Error">
            <ModalProvider />
            <ThemeProvider />
            <RouterProvider router={router} />
        </ErrorBoundary>
    );
}
