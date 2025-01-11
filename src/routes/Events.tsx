import About from "@/pages/About";
import Dashboard from "@/pages/Dashboard";
import { MainLayout } from "@/wrapper/Layout";

export default function EventsRoutes() {
  return {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "about-us", element: <About /> },
    ],
  };
}
