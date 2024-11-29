import * as React from "react";
import Header from "../header/header";
import Navigation from "../navigation/navigation";
import Footer from "../footer/footer";
import CONSTANTS from "../../util/constants";

const Layout = ({
  pathname,
  children,
}: {
  pathname: string;
  children: React.ReactNode;
}) => {
  const [, selectedNavItem] = pathname.split("/");
  const isAboutPage = pathname === CONSTANTS.homePagePath;
  return (
    <>
      <Header />
      <Navigation selectedNavItem={selectedNavItem} isAboutPage={isAboutPage} />
      <main className="main-page-content">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
