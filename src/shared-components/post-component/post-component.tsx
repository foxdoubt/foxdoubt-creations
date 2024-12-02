import * as React from "react";
import Layout from "../layout/layout";
import PostBody from "./post-body/post-body";
import PostTitle from "./post-title/post-title";
import type { ArbitraryTypedObject } from "@portabletext/types";
import PostMainImage from "./post-main-image/post-main-image";
import { Link } from "gatsby";
import { IPostLinkState } from "../../util/types";

type PostComponentProps = Queries.PostContext & {
  nextStepsState: IPostLinkState;
  pathname: string;
};

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
  pathname,
  nextStepsState = {
    nextStepLinkText: undefined,
    nextStepsLinkPath: undefined,
  },
}: PostComponentProps) => {
  const postTitleProps = {
    title,
    wordCount,
    readTime,
    author,
    lastUpdatedAt,
    description,
  };
  const { nextStepLinkText, nextStepsLinkPath } = nextStepsState;
  const nextStepsHtml =
    nextStepLinkText && nextStepsLinkPath ? (
      <Link className="post-next-steps-link" to={nextStepsLinkPath}>
        <p>{nextStepLinkText}</p>
      </Link>
    ) : null;

  return (
    <Layout pathname={pathname}>
      <div className="post flex-row-center">
        <div className="post-inner-container">
          <PostTitle {...postTitleProps} />
          <PostMainImage
            image={mainImage}
            mainImageCaption={mainImageCaption}
          />
          <div className="post-body">
            <PostBody value={value as ArbitraryTypedObject} />
            {nextStepsHtml}
          </div>
        </div>
      </div>
    </Layout>
  );
};
