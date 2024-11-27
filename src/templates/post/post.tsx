import * as React from "react";
import { PageProps } from "gatsby";
import Layout from "../../shared-components/layout/layout";
import PostBody from "../../shared-components/post-body/post-body";
import PostTitle from "../../shared-components/post-title/post-title";
import type { ArbitraryTypedObject } from "@portabletext/types";

export default ({
  pageContext,
  location,
}: PageProps<any, Queries.PostContext>) => {
  const { wordCount, readTime, value, title, author, lastUpdatedAt } =
    pageContext;
  return (
    <Layout pathname={location.pathname}>
      <div className="post flex-row-center">
        <div className="post-inner-container">
          <PostTitle
            wordCount={wordCount}
            readTime={readTime}
            author={author}
            title={title}
            lastUpdatedAt={lastUpdatedAt}
          />
          <PostBody value={value as ArbitraryTypedObject} />
        </div>
      </div>
    </Layout>
  );
};
