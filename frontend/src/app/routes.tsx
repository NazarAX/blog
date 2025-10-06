import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Home from "../pages/Home";
import Projects from "../pages/Projects";
import ProjectPage from "../pages/Project";
import About from "../pages/About";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "projects", element: <Projects /> },
            { path: "projects/:slug", element: <ProjectPage /> },
            { path: "about", element: <About /> },
            { path: "*", element: <NotFound /> },
        ],
    },
]);
