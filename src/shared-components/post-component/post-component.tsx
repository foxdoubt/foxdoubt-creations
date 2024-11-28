import * as React from "react";
import Layout from "../layout/layout";
import PostBody from "./post-body/post-body";
import PostTitle from "./post-title/post-title";
import type { ArbitraryTypedObject } from "@portabletext/types";
import PostMainImage from "./post-main-image/post-main-image";

export default ({
  wordCount,
  readTime,
  value,
  title,
  author,
  lastUpdatedAt,
  description,
  mainImage,
  mainImageCaption,
}: Queries.PostContext) => {
  const postTitleProps = {
    title,
    wordCount,
    readTime,
    author,
    lastUpdatedAt,
    description,
  };

  return (
    <Layout pathname={location.pathname}>
      <div className="post flex-row-center">
        <div className="post-inner-container">
          <PostTitle {...postTitleProps} />
          <PostMainImage
            image={mainImage}
            mainImageCaption={mainImageCaption}
          />
          <PostBody value={value as ArbitraryTypedObject} />
        </div>
      </div>
    </Layout>
  );
};
