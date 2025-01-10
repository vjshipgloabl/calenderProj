import React from "react";
import Body from "./Body";
import { Header } from "./Header";

type MainLayoutProps = {
  children: React.ReactNode; // Define children prop type
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Body>{children}</Body>
    </>
  );
};
