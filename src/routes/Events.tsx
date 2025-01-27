import About from "@/pages/About";
import Blogs from "@/pages/Blogs";
import Dashboard from "@/pages/Dashboard";
import Events from "@/pages/Events";
import { MainLayout } from "@/wrapper/Layout";

export default function EventsRoutes() {
  return {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "about-us", element: <About /> },
      { path: "blogs", element: <Blogs /> },
      { path: "event", element: <Events /> },
    ],
  };
}
