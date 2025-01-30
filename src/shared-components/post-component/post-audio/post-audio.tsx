import * as React from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import useScreenDimensions from "../../../hooks/use-screen-dimensions";
import CONSTANTS from "../../../util/constants";
import { IPostComponentAudioState } from "../../../util/types";

import {
  TbRewindForward15,
  TbRewindBackward15,
  TbPlayerPlayFilled,
  TbPlayerPauseFilled,
  TbChevronUp,
  TbX,
  TbChevronDown,
} from "react-icons/tb";

interface IPostAudioState {
  playerState: IPostComponentAudioState;
  isVisible: boolean;
  isInitialState: boolean;
  close: () => void;
  toggleVisibility: () => void;
  togglePlay: (isPlaying: boolean) => void;
  postTitle: Queries.Maybe<string>;
  player: React.RefObject<AudioPlayer>;
  rssData: Queries.podcastRssFeedEpisodeItem;
}

const PostAudio = ({
  playerState,
  close,
  toggleVisibility,
  postTitle,
  player,
  togglePlay,
  rssData,
}: IPostAudioState) => {
  const { isInitialState, isPlayerVisible: isVisible } = playerState;
  const src = rssData?.enclosure?.url;

  const screenDimensions = useScreenDimensions();

  const isUserOnTabletOrNarrower =
    screenDimensions.width <= CONSTANTS.tabletBreakpointWidth;

  let screenSizeDependentProps = {
    layout: "horizontal-reverse",
    className: "post-audio",
  };
  let closeAndHideContainerScreenSize = "desktop";

  if (isUserOnTabletOrNarrower) {
    screenSizeDependentProps = {
      layout: "stacked-reverse",
      className: "post-audio is-tablet-or-narrower",
    };
    closeAndHideContainerScreenSize = "tablet";
  }

  const playIcon = <TbPlayerPlayFilled color="black" />;
  const pauseIcon = <TbPlayerPauseFilled color="black" />;
  const rewindIcon = <TbRewindBackward15 color="black" />;
  const fastForwardIcon = <TbRewindForward15 color="black" />;
  const xIcon = <TbX color="black" size="1.5em" />;
  const hideIcon = <TbChevronDown color="black" size="1.5em" />;
  const expandIcon = <TbChevronUp color="black" size="1.5em" />;

  const initialStateContainerClassNames = "post-audio-container";

  const containerClassNames = (
    isInitialState
      ? initialStateContainerClassNames
      : `post-audio-container${isVisible ? " audio-visible" : " audio-hidden"}`
  ).concat(" ", closeAndHideContainerScreenSize);

  return src ? (
    <div className={containerClassNames}>
      <div className="close-and-hide-section-container">
        <div className="close-and-hide-section">
          <span onClick={toggleVisibility} className="hide-show-btn">
            {isVisible ? hideIcon : expandIcon}
          </span>
          <span key="close-btn" onClick={close}>
            {xIcon}
          </span>
        </div>
      </div>
      <AudioPlayer
        onPause={() => {
          togglePlay(false);
        }}
        onPlay={() => {
          togglePlay(true);
        }}
        ref={player}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        layout={screenSizeDependentProps.layout as any}
        className={screenSizeDependentProps.className}
        header={[
          <div key="post-title" className="post-audio-title">
            {postTitle}
          </div>,
        ]}
        customVolumeControls={[]}
        customIcons={{
          play: playIcon,
          pause: pauseIcon,
          rewind: rewindIcon,
          forward: fastForwardIcon,
        }}
        customAdditionalControls={[RHAP_UI.MAIN_CONTROLS]}
        customControlsSection={[RHAP_UI.MAIN_CONTROLS]}
        customProgressBarSection={[
          RHAP_UI.CURRENT_TIME,
          RHAP_UI.PROGRESS_BAR,
          RHAP_UI.DURATION,
        ]}
        progressJumpStep={15000}
        src={src}
      />
    </div>
  ) : null;
};

export default PostAudio;
