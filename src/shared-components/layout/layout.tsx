import * as React from "react";
import Header from "../header/header";
import Navigation from "../navigation/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Navigation />
      {children}
    </>
  );
};

export default Layout;
