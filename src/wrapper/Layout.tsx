import React from "react";
// import Body from "./Body";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

type MainLayoutProps = {
  children?: React.ReactNode; // Define children prop type
};

export const MainLayout: React.FC<MainLayoutProps> = () => {
  return (
    <div className="w-full h-screen overflow-x-hidden">
      <Header />
      <Sidebar />
      <section className="z-10 relative bg-regalBlue pl-[300px] pr-12 pt-24 w-full h-screen pb-10 ">
        <Outlet />
      </section>
    </div>
  );
};
