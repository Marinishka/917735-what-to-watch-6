import React, {useState, useRef} from 'react';
import {UNIT_OF_TIME} from '../../const';
import VideoPlayer from '../video-player/video-player';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';

const Player = () => {
  const {activeFilm} = useSelector((state) => state.LOCAL);
  const {videoLink, posterImage, runTime, name} = activeFilm;

  const history = useHistory();

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [fullDuration, setFullDuration] = useState(runTime);
  const playerRef = useRef();

  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  let durationElapsed = 0;

  const updateCurrentTime = (time) => {
    setCurrentTime(time);
  };

  const getPercentDuration = () => {
    return Math.floor((100 / fullDuration) * currentTime);
  };

  const getTimeElapsed = () => {
    durationElapsed = fullDuration - currentTime;
    hours = Math.floor(durationElapsed / UNIT_OF_TIME / UNIT_OF_TIME);
    minutes = Math.floor(durationElapsed / UNIT_OF_TIME) - (hours * UNIT_OF_TIME);
    seconds = Math.floor(durationElapsed % UNIT_OF_TIME);
    return `${hours.toString().padStart(2, `0`)}:${minutes.toString().padStart(2, `0`)}:${seconds.toString().padStart(2, `0`)}`;
  };

  const handleFullScreenChange = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      playerRef.current.requestFullscreen();
    }
  };

  return <div className="player" ref={playerRef}>
    <VideoPlayer isMuted={false} isPlaying={isPlaying} src={videoLink} posterImage={posterImage} name={name} defaultCurrentTime={currentTime} updateCurrentTime={updateCurrentTime} setFullDuration={setFullDuration}/>
    <button type="button" className="player__exit" onClick={() => {
      history.goBack();
    }}>Exit</button>
    <div className="player__controls">
      <div className="player__controls-row">
        <div className="player__time">
          <progress className="player__progress" value={getPercentDuration()} max="100"></progress>
          <div className="player__toggler" style={{left: `${getPercentDuration()}%`}}>Toggler</div>
        </div>
        <div className="player__time-value">{getTimeElapsed()}</div>
      </div>

      <div className="player__controls-row">
        <button type="button" className="player__play" onClick={() => {
          setIsPlaying((prevIsPlayng) => !prevIsPlayng);
        }}>
          <svg viewBox="0 0 19 19" width="19" height="19">
            <use xlinkHref={isPlaying ? `#pause` : `#play-s`}></use>
          </svg>
          <span>Play</span>
        </button>
        <div className="player__name">Transpotting</div>

        <button type="button" className="player__full-screen" onClick={() => handleFullScreenChange()}>
          <svg viewBox="0 0 27 27" width="27" height="27">
            <use xlinkHref="#full-screen"></use>
          </svg>
          <span>Full screen</span>
        </button>
      </div>
    </div>
  </div>;
};

export default Player;
