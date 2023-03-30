import React from "react";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="min-h-screen">{children}</div>;
};

export default DefaultLayout;
