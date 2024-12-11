import * as React from "react";
import AudioPlayer from "react-h5-audio-player";
import { StaticImage } from "gatsby-plugin-image";

const PostAudio = () => {
  const playIcon = (
    <StaticImage
      src="../../../images/post-audio-player-play-icon.svg"
      alt="audio-play-icon"
    />
  );

  const pauseIcon = (
    <StaticImage
      src="../../../images/post-audio-player-pause-icon.svg"
      alt="audio-play-icon"
    />
  );

  const rewindIcon = (
    <StaticImage
      src="../../../images/post-audio-player-rewind-icon.svg"
      alt="audio-skip-back-button"
    />
  );

  const fastForwardIcon = (
    <StaticImage
      src="../../../images/post-audio-player-fast-forward-icon.svg"
      alt="audio-skip-back-button"
    />
  );
  return (
    <div className="post-audio-container">
      <AudioPlayer
        className="post-audio"
        customAdditionalControls={[]}
        customIcons={{
          play: playIcon,
          pause: pauseIcon,
          rewind: rewindIcon,
          forward: fastForwardIcon,
        }}
        src="https://www.freesoundslibrary.com/wp-content/uploads/2020/12/blue-jay-sounds.mp3"
      />
    </div>
  );
};

export default PostAudio;
