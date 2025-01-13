import React from "react";

type BodyProps = {
  children: React.ReactNode;
};

const Body: React.FC<BodyProps> = ({ children }) => {
  return (
    <section className="p-2 mt-16 h-screen bg-sky-100">
      {children} {/* Render children here */}
    </section>
  );
};

export default Body;
