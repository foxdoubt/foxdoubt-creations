import * as React from "react";
import AudioPlayer from "react-h5-audio-player";
import { StaticImage } from "gatsby-plugin-image";
import useScreenDimensions from "../../../hooks/use-screen-dimensions";
import CONSTANTS from "../../../util/constants";

const PostAudio = () => {
  const src = null;
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

  const mobileSpecificProps = {
    customVolumeControls: isUserOnMobileDevice ? [] : undefined,
  };
  return src ? (
    <div className="post-audio-container">
      <AudioPlayer
        className="post-audio"
        customAdditionalControls={[]}
        customIcons={{
          play: playIcon,
          pause: pauseIcon,
          rewind: rewindIcon,
          forward: fastForwardIcon,
          volume: volumeIcon,
          volumeMute: muteIcon,
        }}
        progressJumpStep={15000}
        src="https://www.freesoundslibrary.com/wp-content/uploads/2020/12/blue-jay-sounds.mp3"
        {...mobileSpecificProps}
      />
    </div>
  ) : null;
};

export default PostAudio;
