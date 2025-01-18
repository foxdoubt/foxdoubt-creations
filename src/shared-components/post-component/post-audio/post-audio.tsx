import * as React from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import { StaticImage } from "gatsby-plugin-image";
import {
  TbRewindForward15,
  TbRewindBackward15,
  TbPlayerPlayFilled,
  TbPlayerPauseFilled,
  TbCaretDownFilled,
  TbCaretUpFilled,
  TbX,
} from "react-icons/tb";

interface IPostAudioState {
  isVisible: boolean;
  isInitialState: boolean;
  isPlaying: boolean;
  close: () => void;
  toggleVisibility: () => void;
  postTitle: Queries.Maybe<string>;
}

const PostAudio = ({
  isVisible = false,
  isInitialState,
  // isPlaying,
  close,
  toggleVisibility,
  postTitle,
}: IPostAudioState) => {
  const src =
    "https://www.soundsnap.com/bird_young_blue_jay_calls_and_wings_flapping_4";

  const playIcon = <TbPlayerPlayFilled color="black" />;
  const pauseIcon = <TbPlayerPauseFilled color="black" />;
  const rewindIcon = <TbRewindBackward15 color="black" />;
  const fastForwardIcon = <TbRewindForward15 color="black" />;
  const xIcon = <TbX color="black" />;
  const hideIcon = <TbCaretDownFilled color="black" />;
  const expandIcon = <TbCaretUpFilled color="black" />;

  const initialStateContainerClassNames = "post-audio-container";

  const containerClassNames = isInitialState
    ? initialStateContainerClassNames
    : `post-audio-container${isVisible ? " audio-visible" : " audio-hidden"}`;

  return src ? (
    <div className={containerClassNames}>
      <div className="close-and-hide">
        <span onClick={toggleVisibility} className="hide-show-btn">
          {isVisible ? hideIcon : expandIcon}
        </span>
        <span key="close-btn" onClick={close} style={{ marginLeft: "30px" }}>
          {xIcon}
        </span>
      </div>
      <AudioPlayer
        className="post-audio"
        layout="horizontal-reverse"
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
        src="https://www.freesoundslibrary.com/wp-content/uploads/2020/12/blue-jay-sounds.mp3"
      />
    </div>
  ) : null;
};

export default PostAudio;
