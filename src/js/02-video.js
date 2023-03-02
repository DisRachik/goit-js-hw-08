import Vimeo from '@vimeo/player';
import _throttle from 'lodash.throttle';

const VIDEO_TIME_KEY_STORAGE = 'videoplayer-current-time';

const iframeEl = document.querySelector('#vimeo-player');
const player = new Vimeo(iframeEl);

const onRememberTimeVideo = ({ seconds }) => {
  localStorage.setItem(VIDEO_TIME_KEY_STORAGE, seconds);
};

player.setCurrentTime(localStorage.getItem(VIDEO_TIME_KEY_STORAGE));
player.on('timeupdate', _throttle(onRememberTimeVideo, 1000));
