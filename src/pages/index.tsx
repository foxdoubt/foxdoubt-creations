import type { HeadFC, PageProps } from "gatsby";
import * as React from "react";
import { navigate } from "gatsby";
import CONSTANTS from "../util/constants";
import isBrowser from "../util/is-browser";

// using homepage to develop page features
// will route later with pages, templates, etc.

const IndexPage: React.FC<PageProps> = () => {
  // auditing Gatsby upgraded gatsby-link to 5.14.0, which broke this type
  // https://github.com/gatsbyjs/gatsby/commit/6cb6ffb02f7080a1cfd02f88ebf34c18a51f54b3
  // eslint-disable-next-line
  if (isBrowser) navigate(CONSTANTS.homePagePath as any);
  return null;
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
