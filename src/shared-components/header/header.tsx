import * as React from "react";

const Header = () => {
  const siteTitle = ["foxdoubt", "/", "creations"];
  const siteDescription = "By Daniel DeWald";
  return (
    <div className="header-container">
      {/* <SiteLogo />
        <SiteTitle /> */}
      <div className="site-logo-container">
        <div className="site-logo"></div>
      </div>
      <div className="site-title-container">
        <h1 className="font-site-title">
          <span>{siteTitle[0]}</span>
          <span className="accent-text">{siteTitle[1]}</span>
          <span>{siteTitle[2]}</span>
        </h1>
        <p className="site-description">{siteDescription}</p>
      </div>
    </div>
  );
};

export default Header;
