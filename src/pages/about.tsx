import * as React from "react";
import Layout from "../shared-components/layout/layout";
import type { HeadFC } from "gatsby";
import { graphql, Link, PageProps } from "gatsby";
import PostTitle from "../shared-components/post-title/post-title";
import PostBody from "../shared-components/post-body/post-body";

import { ArbitraryTypedObject } from "@portabletext/types";

export default (props: PageProps<Queries.GetAboutPostQuery>) => {
  const {
    json: {
      data: { sanityPost },
    },
  } = props.pageResources;

  return (
    <Layout pathname={location.pathname}>
      <div className="post flex-row-center">
        <div className="post-inner-container">
          <PostTitle
            // wordCount={wordCount}
            // readTime={readTime}
            // author={author}
            title={sanityPost?.title}
          />
          <PostBody value={sanityPost?._rawBody as ArbitraryTypedObject} />
        </div>
      </div>
    </Layout>
  );
};

export const Head: HeadFC = () => <title>About</title>;

export const query = graphql`
  query GetAboutPost {
    sanityPost(slug: {current: {eq: "about-daniel-dewald"}}) {
      title
      description
      mainImage {
        asset {
          gatsbyImageData
        }
      }
      slug {
        current
      }
      _rawBody
    }
  }
`;
