import * as React from "react";
import img from "../../images/tavis-beck-fox-unsplash.jpg";

const Header = () => {
  const siteTitle = "foxdoubt / creations";
  const siteDescription = "By Daniel DeWald";
  return (
    <div className="header-container">
      {/* <SiteLogo />
        <SiteTitle /> */}
      <div className="site-logo-container">
        <img className="site-logo" src={img} />
      </div>
      <div className="site-title-container">
        <h1 className="font-site-title">{siteTitle}</h1>
        <p className="font-main">{siteDescription}</p>
      </div>
    </div>
  );
};

export default Header;
