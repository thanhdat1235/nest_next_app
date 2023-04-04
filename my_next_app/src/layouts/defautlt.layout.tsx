import React from "react";
import Footer from "../includes/footer";
import Header from "../includes/header";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="min-h-screen">
    <Header/>
    {children}
    <Footer/>
    </div>;
};

export default DefaultLayout;
