import * as React from "react";
import Layout from "../layout/layout";
import PostBody from "./post-body/post-body";
import PostTitle from "./post-title/post-title";
import PostAudio from "./post-audio/post-audio";
import type { ArbitraryTypedObject } from "@portabletext/types";
import PostMainImage from "./post-main-image/post-main-image";
import { Link } from "gatsby";
import { IPostLinkState } from "../../util/types";

type PostComponentProps = Queries.PostContext & {
  nextStepsState: IPostLinkState;
  pathname: string;
};

const { useState } = React;

interface IPostComponentAudioState {
  isPlayerVisible: boolean;
  isPlayerHidden: boolean | null;
  isPlayerPlaying: boolean;
}

const initialState: IPostComponentAudioState = {
  isPlayerVisible: false,
  isPlayerHidden: null,
  isPlayerPlaying: false,
};

const PostComponent = ({
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
  const [postAudioState, setPostAudioState] =
    useState<IPostComponentAudioState>(initialState);

  const showPostAudio = () => {
    setPostAudioState({
      ...postAudioState,
      isPlayerVisible: true,
    });
  };

  const closePostAudio = () => {
    setPostAudioState(initialState);
  };

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
    <>
      <Layout pathname={pathname}>
        <div className="post flex-row-center">
          <div className="post-inner-container">
            <PostTitle {...postTitleProps} />
            <PostMainImage
              image={mainImage}
              mainImageCaption={mainImageCaption}
            />
            {/* TODO: Replace with component that has play icon and correct styles */}
            <p className="show-introduction" onClick={showPostAudio}>
              Play post as audio
            </p>
            <div className="post-body">
              <PostBody value={value as ArbitraryTypedObject} />
              {nextStepsHtml}
            </div>
          </div>
        </div>
      </Layout>
      <PostAudio
        isVisible={postAudioState.isPlayerVisible}
        close={closePostAudio}
      />
    </>
  );
};

export default PostComponent;
