import * as React from "react";

const copyRight = "Daniel DeWald 2024";

const Footer = () => (
  <div className="footer-container">
    <div className="footer flex-column-center">
      <p className="font-secondary copyright">&copy; {copyRight}</p>
    </div>
  </div>
);

export default Footer;
