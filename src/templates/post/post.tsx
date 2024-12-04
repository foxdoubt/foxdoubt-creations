import * as React from "react";
import { PageProps } from "gatsby";

import PostComponent from "../../shared-components/post-component/post-component";
import { IPostLinkState } from "../../util/types";

const PostTemplate = ({
  pageContext,
  location,
}: PageProps<any, Queries.PostContext, IPostLinkState>) => {
  const postProps = {
    pathname: location.pathname,
    nextStepsState: location.state,
    ...pageContext,
  };
  return <PostComponent {...postProps} />;
};

export default PostTemplate;
