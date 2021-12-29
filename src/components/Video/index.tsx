import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";

const Video = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const playOrPause = useCallback(() => {
    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, []);

  const onPlay = useCallback(() => setIsPlaying(true), []);

  const onPause = useCallback(() => setIsPlaying(false), []);

  return (
    <div className="video-wrapper">
      <video
        onPlay={onPlay}
        onPause={onPause}
        ref={videoRef}
        className="video rounded-md"
        src={`${process.env.AWS_URL}${src}`}
      />
      <div className="controls" onClick={playOrPause}>
        <Image
          src="/assets/play.png"
          alt="play button"
          className={`video-control ${
            isPlaying ? "control-hidden" : "control-shown"
          }`}
          height="50"
          width="50"
        />
      </div>
    </div>
  );
};

export default Video;