import * as React from "react";

const Navigation = () => {
  const props = ["about", "artwork", "web dev", "musings"];
  const [aboutNav, ...items] = props;
  const selected = "artwork";
  return (
    <div className="site-navigation-container">
      <nav className="site-navigation">
        <p className="nav-item about-nav-item">{aboutNav}</p>
        <div className="nav-item-container">
          {items.map((navItem, i) => {
            const isSelected = navItem === selected;
            const classNames = isSelected ? "selected nav-item" : "nav-item";
            return (
              <p className={classNames} key={`nav-item-${navItem}-${i}`}>
                {navItem}
              </p>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
