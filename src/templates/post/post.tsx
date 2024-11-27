import * as React from "react";
import { PageProps } from "gatsby";

import PostComponent from "../../shared-components/post-component/post-component";

export default ({
  pageContext,
  location,
  pageResources,
}: PageProps<any, Queries.PostContext>) => {
  const postProps = {
    pathname: location.pathname,
    ...pageContext,
  };
  return <PostComponent {...postProps} />;
};
