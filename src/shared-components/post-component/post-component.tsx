import * as React from "react";
import Layout from "../layout/layout";
import PostBody from "./post-body/post-body";
import PostTitle from "./post-title/post-title";
import PostAudio from "./post-audio/post-audio";
import type { ArbitraryTypedObject } from "@portabletext/types";
import PostMainImage from "./post-main-image/post-main-image";
import { Link } from "gatsby";
import { IPostLinkState } from "../../util/types";
import { TbPlayerPlayFilled, TbPlayerPauseFilled } from "react-icons/tb";
import AudioPlayer from "react-h5-audio-player";
import { IPostComponentAudioState } from "../../util/types";

type PostComponentProps = Queries.PostContext &
  Queries.getPodcastEpisodeBySlugQuery & {
    nextStepsState: IPostLinkState;
    pathname: string;
  };

const initialState: IPostComponentAudioState = {
  isPlayerVisible: false,
  isPlayerPlaying: false,
  isInitialState: true,
};

const PostAudioPlayerButton = ({
  postAudioState,
  setPostAudioState,
  playerRef,
}: {
  postAudioState: IPostComponentAudioState;
  setPostAudioState: (state: IPostComponentAudioState) => void;
  playerRef: React.RefObject<AudioPlayer>;
}) => {
  const initializePostAudioPlayer = () => {
    setPostAudioState({
      isPlayerPlaying: true,
      isPlayerVisible: true,
      isInitialState: false,
    });
  };

  const setIsPlaying = (isPlayerPlaying: boolean) => {
    setPostAudioState({
      ...postAudioState,
      isPlayerPlaying,
    });
  };

  React.useEffect(() => {
    if (postAudioState.isPlayerPlaying) {
      playerRef.current?.audio.current?.play();
    } else {
      playerRef.current?.audio.current?.pause();
    }
  });

  const postAsAudioButtonOnClick = () => {
    if (postAudioState.isInitialState) {
      initializePostAudioPlayer();
    } else {
      setIsPlaying(!postAudioState.isPlayerPlaying);
    }
  };

  if (postAudioState.isPlayerPlaying) {
    return <TbPlayerPauseFilled onClick={postAsAudioButtonOnClick} />;
  }
  return <TbPlayerPlayFilled onClick={postAsAudioButtonOnClick} />;
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
  podcastRssFeedEpisode,
  nextStepsState = {
    nextStepLinkText: undefined,
    nextStepsLinkPath: undefined,
  },
}: PostComponentProps) => {
  const rssData = podcastRssFeedEpisode?.item;
  const [postAudioState, setPostAudioState] =
    React.useState<IPostComponentAudioState>(initialState);

  const playerRef = React.useRef<AudioPlayer>(null);

  const togglePostAudioVisibility = () => {
    const { isPlayerVisible } = postAudioState;
    setPostAudioState({
      ...postAudioState,
      isPlayerVisible: !isPlayerVisible,
    });
  };

  const resetPostAudio = () => {
    setPostAudioState(initialState);
  };

  const setIsPlaying = (isPlayerPlaying: boolean) => {
    setPostAudioState({
      ...postAudioState,
      isPlayerPlaying,
    });
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

            <div className="post-as-audio-button">
              <span className="flex-column-center post-as-audio-icon">
                <PostAudioPlayerButton
                  postAudioState={postAudioState}
                  setPostAudioState={setPostAudioState}
                  playerRef={playerRef}
                />
              </span>
              <p className="post-as-audio-text">Play post as audio</p>
            </div>
            <div className="post-body">
              <PostBody value={value as ArbitraryTypedObject} />
              {nextStepsHtml}
            </div>
          </div>
        </div>
      </Layout>
      <PostAudio
        rssData={rssData}
        playerState={postAudioState}
        isInitialState={postAudioState.isInitialState}
        isVisible={postAudioState.isPlayerVisible}
        toggleVisibility={togglePostAudioVisibility}
        close={resetPostAudio}
        postTitle={title}
        player={playerRef}
        togglePlay={setIsPlaying}
      />
    </>
  );
};

export default PostComponent;
