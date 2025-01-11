import React from "react";
import Body from "./Body";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";

type MainLayoutProps = {
  children?: React.ReactNode; // Define children prop type
};

export const MainLayout: React.FC<MainLayoutProps> = () => {
  return (
    <>
      <Header />
      <Body>
        <Outlet />
      </Body>
    </>
  );
};
