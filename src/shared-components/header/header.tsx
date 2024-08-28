import * as React from "react";

const Header = () => {
  const siteTitle = "Foxdoubt / creations";
  const siteDescription = "By Daniel DeWald";
  return (
    <div>
      {/* <SiteLogo />
        <SiteTitle /> */}
      <div className="site-title-container">
        <h1 className="font-site-title">{siteTitle}</h1>
        <p className="font-main">{siteDescription}</p>
      </div>
    </div>
  );
};

export default Header;
