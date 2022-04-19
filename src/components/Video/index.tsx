import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";

import { GiSpeaker, GiSpeakerOff } from 'react-icons/gi'

import { AWS_URL } from "../../utils/const";

interface Props {
  src: string
}

const Video = (props: Props) => {
  const [ isPlaying, setIsPlaying ] = useState(false);
  const [ isMuted, setIsMuted ] = useState(false);
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
        src={props.src}
        muted={isMuted}
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
      <div className="sound">
        {isMuted ? 
          <div className="border-none rounded-full h-6 w-6 bg-cardBlue-100 flex justify-center items-center">
            <GiSpeakerOff onClick={() => setIsMuted(false)} className="h-5 w-5 text-white"/> 
          </div>
        : 
          <div className="border-none rounded-full h-6 w-6 bg-cardBlue-100 flex justify-center items-center"> 
            <GiSpeaker onClick={() => setIsMuted(true)} className="h-5  w-5 text-white"/>
          </div>
        }
      </div>
    </div>
  );
};

export default Video;