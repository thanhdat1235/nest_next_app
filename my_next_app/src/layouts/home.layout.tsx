import React from "react";
import Sidebar from "../components/Sidebar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default HomeLayout;
