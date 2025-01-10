import About from "@/pages/About";
import Dashboard from "@/pages/Dashboard";
import { MainLayout } from "@/wrapper/Layout";
import { Outlet } from "react-router-dom";

export default function EventsRoutes() {
  return {
    path: "/",
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [
      { path: "", element: <Dashboard /> },
      { path: "/about-us", element: <About /> },
    ],
  };
}
