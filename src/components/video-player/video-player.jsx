import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';

const VideoPlayer = ({isMuted, isPlaying, src, posterImage, name, defaultCurrentTime, updateCurrentTime, setFullDuration}) => {
  const videoRef = useRef();

  const [time, setCurrentTime] = useState(defaultCurrentTime);

  useEffect(() => {
    videoRef.current.ontimeupdate = () => {
      setCurrentTime(videoRef.current.currentTime);
      if (updateCurrentTime) {
        updateCurrentTime(time);
      }
    };
    return () => {
      videoRef.current.ontimeupdate = null;
    };
  }, [time]);

  useEffect(() => {
    videoRef.current.muted = isMuted;
    if (setFullDuration) {
      videoRef.current.onloadeddata = () => setFullDuration(videoRef.current.duration);
    }
  }, [isMuted]);

  useEffect(() => {
    if (isPlaying) {
      videoRef.current.play();
      return;
    }
    videoRef.current.pause();
  }, [isPlaying]);

  return (
    <video className="player__video" src={src} ref={videoRef} poster={posterImage}>
      <img src={`${posterImage}`} alt={`${name}`} width="280" height="175" />
    </video>
  );
};

VideoPlayer.propTypes = {
  isMuted: PropTypes.bool,
  isPlaying: PropTypes.bool,
  src: PropTypes.string,
  name: PropTypes.string,
  posterImage: PropTypes.string,
  defaultCurrentTime: PropTypes.number,
  updateCurrentTime: PropTypes.func,
  setFullDuration: PropTypes.func
};

export default VideoPlayer;
