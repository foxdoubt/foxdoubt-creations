import * as React from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import { StaticImage } from "gatsby-plugin-image";

interface IPostAudioState {
  isVisible: boolean;
  isHidden: boolean;
  close: () => void;
  hide: () => void;
  postTitle: Queries.Maybe<string>;
  postAuthor: Queries.Maybe<string>;
}

const PostAudio = ({
  isVisible = false,
  close,
  postTitle,
  isHidden = false,
  hide,
}: IPostAudioState) => {
  const src =
    "https://www.soundsnap.com/bird_young_blue_jay_calls_and_wings_flapping_4";

  const playIcon = (
    <StaticImage
      src="../../../images/post-audio-player-play-icon.svg"
      placeholder="none"
      alt="audio-play-icon"
    />
  );

  const pauseIcon = (
    <StaticImage
      src="../../../images/post-audio-player-pause-icon.svg"
      placeholder="none"
      alt="audio-pause-icon"
    />
  );

  const rewindIcon = (
    <StaticImage
      src="../../../images/post-audio-player-rewind-icon.svg"
      placeholder="none"
      alt="audio-rewind-icon"
    />
  );

  const fastForwardIcon = (
    <StaticImage
      src="../../../images/post-audio-player-forward-icon.svg"
      placeholder="none"
      alt="audio-forward-icon"
    />
  );

  const volumeIcon = (
    <StaticImage
      src="../../../images/post-audio-player-volume-icon.svg"
      placeholder="none"
      alt="audio-volume-icon"
    />
  );

  const muteIcon = (
    <StaticImage
      src="../../../images/post-audio-player-mute-icon.svg"
      placeholder="none"
      alt="audio-mute-icon"
    />
  );

  const xIcon = "X";
  const hideIcon = "v";
  const expandIcon = "^";

  const containerClassNames = `post-audio-container ${
    isVisible ? "audio-playing" : ""
  } ${isHidden ? "audio-hidden" : ""}`;

  return src ? (
    <div className={containerClassNames}>
      <div className="close-and-hide">
        <span onClick={hide} className="hide-show-btn">
          {isHidden ? expandIcon : hideIcon}
        </span>
        <span key="close-btn" onClick={close} style={{ marginLeft: "30px" }}>
          {xIcon}
        </span>
      </div>
      <AudioPlayer
        className="post-audio"
        layout="horizontal-reverse"
        header={[
          <div key="post-title" className="post-title">
            {postTitle}
          </div>,
        ]}
        customAdditionalControls={[]}
        customVolumeControls={[]}
        customIcons={{
          play: playIcon,
          pause: pauseIcon,
          rewind: rewindIcon,
          forward: fastForwardIcon,
          volume: volumeIcon,
          volumeMute: muteIcon,
        }}
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
