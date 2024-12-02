import * as React from "react";

import { Link, graphql, useStaticQuery } from "gatsby";
import CONSTANTS from "../../util/constants";

const Navigation = ({
  selectedNavItem,
  isAboutPage = false,
}: {
  selectedNavItem: string | null;
  isAboutPage: boolean;
}) => {
  const result = useStaticQuery<Queries.getAllCategoriesQuery>(graphql` 
    query getAllCategories {
      allSanityCategory(sort:{ title:ASC }) {
        edges {
          node {
            title
            slug {
              current
            }
          }
        }
      }
    }`);

  const aboutItemClassNames = "nav-item about-nav-item";

  return (
    <div className="site-navigation-container">
      <div className="nav-center">
        <nav className="site-navigation">
          <div className="about-item-container flex-row-center">
            <div className="width-fit-content">
              <Link to={CONSTANTS.homePagePath}>
                <p
                  className={
                    isAboutPage
                      ? aboutItemClassNames.concat(" ", "selected")
                      : aboutItemClassNames
                  }
                >
                  about
                </p>
              </Link>
            </div>
          </div>
          <div className="nav-items-container">
            <div className="flex-container">
              {result.allSanityCategory.edges.map(({ node }, i) => {
                const slug = node.slug?.current;

                // temporary link disabling for non-existent category pages
                let classNames = "nav-item nav-item-category disabled";
                let linkPath = "#";

                if (slug === "artwork") {
                  classNames = "nav-item nav-item-category";
                  linkPath = `/${slug}`;
                }

                classNames =
                  selectedNavItem && selectedNavItem === slug
                    ? classNames.concat(" ", "selected")
                    : classNames;

                return (
                  <Link to={linkPath} className="nav-link">
                    <p
                      className={classNames}
                      key={`nav-item-${node.title}-${i}`}
                    >
                      {node.title}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
