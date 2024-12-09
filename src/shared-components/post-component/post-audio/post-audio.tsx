import * as React from "react";
import AudioPlayer from "react-h5-audio-player";

const PostAudio = () => {
  return (
    <div className="post-audio-container">
      <AudioPlayer
        className="post-audio"
        customAdditionalControls={[]}
        src="https://www.freesoundslibrary.com/wp-content/uploads/2020/12/blue-jay-sounds.mp3"
      />
    </div>
  );
};

export default PostAudio;
