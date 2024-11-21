import * as React from "react";
import Header from "../header/header";
import Navigation from "../navigation/navigation";
import Footer from "../footer/footer";

const Layout = ({
  pathname,
  children,
}: {
  pathname: string;
  children: React.ReactNode;
}) => {
  const [, selectedNavItem] = pathname.split("/");
  return (
    <>
      <Header />
      <Navigation selectedNavItem={selectedNavItem} />
      <main className="main-page-content">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
