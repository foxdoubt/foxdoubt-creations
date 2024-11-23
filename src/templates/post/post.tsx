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
  const { wordCount, readTime, value, title, author } = pageContext;
  return (
    <Layout pathname={location.pathname}>
      <PostTitle wordCount={wordCount} readTime={readTime} author={author} />
      <PostBody value={value as ArbitraryTypedObject} title={title} />
    </Layout>
  );
};
