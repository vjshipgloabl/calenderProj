import React from "react";

type BodyProps = {
  children: React.ReactNode;
};

const Body: React.FC<BodyProps> = ({ children }) => {
  return <div className="top-16 relative h-screen bg-sky-800">{children}</div>;
};

export default Body;
