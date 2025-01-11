import React from "react";

type BodyProps = {
  children: React.ReactNode;
};

const Body: React.FC<BodyProps> = ({ children }) => {
  return (
    <section className="top-16 p-2 relative h-screen bg-sky-100">
      {children} {/* Render children here */}
    </section>
  );
};

export default Body;
