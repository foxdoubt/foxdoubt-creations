import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { navigate } from "gatsby";
import CONSTANTS from "../util/constants";

// using homepage to develop page features
// will route later with pages, templates, etc.

const IndexPage: React.FC<PageProps> = () => {
  navigate(CONSTANTS.homePagePath);
  return null;
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
