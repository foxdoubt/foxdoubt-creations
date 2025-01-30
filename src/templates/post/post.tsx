import * as React from "react";
import { PageProps, graphql } from "gatsby";

import PostComponent from "../../shared-components/post-component/post-component";
import { IPostLinkState } from "../../util/types";

const PostTemplate = ({
  pageContext,
  location,
  data,
}: PageProps<
  Queries.getPodcastEpisodeBySlugQuery,
  Queries.PostContext,
  IPostLinkState,
  Queries.SanityPost
>) => {
  const postProps = {
    pathname: location.pathname,
    nextStepsState: location.state,
    ...data,
    ...pageContext,
  };

  return <PostComponent {...postProps} />;
};

export default PostTemplate;

export const query = graphql`
query getPodcastEpisodeBySlug($episodeSlug: String) {
  podcastRssFeedEpisode(item: { slug: { eq: $episodeSlug } }) {
    item {
      title
      description
      enclosure {
        url 
        type
      }
    }
  }
}`;
