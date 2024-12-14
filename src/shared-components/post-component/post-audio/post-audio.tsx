import * as React from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import { StaticImage } from "gatsby-plugin-image";
import useScreenDimensions from "../../../hooks/use-screen-dimensions";
import CONSTANTS from "../../../util/constants";

interface IPostAudioState {
  isVisible: boolean;
  close: () => void;
}

const PostAudio = ({ isVisible = false, close }: IPostAudioState) => {
  console.log({ isVisible });
  const src =
    "https://www.soundsnap.com/bird_young_blue_jay_calls_and_wings_flapping_4";
  const screenDimensions = useScreenDimensions();
  const isUserOnMobileDevice =
    screenDimensions.width <= CONSTANTS.mobileBreakpointWidth;

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

  const containerClassNames = `post-audio-container ${
    isVisible ? "audio-playing" : ""
  }`;
  return src ? (
    <div className={containerClassNames}>
      <AudioPlayer
        className="post-audio"
        layout="horizontal-reverse"
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
          <div key="close-btn" onClick={close} style={{ marginLeft: "30px" }}>
            X
          </div>,
        ]}
        progressJumpStep={15000}
        src="https://www.freesoundslibrary.com/wp-content/uploads/2020/12/blue-jay-sounds.mp3"
      />
    </div>
  ) : null;
};

export default PostAudio;
