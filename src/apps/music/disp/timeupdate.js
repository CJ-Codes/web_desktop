import { lyricFocus } from './';

export const timeupdate = (
  {
    currentTime, duration,
    _state, _lyric, buffered, isUnmounted
  },
  setAudioData, setActive,
) => {
  if (isUnmounted) return;

  let buffer = 0;
  const i = buffered.length;
  const lyric = _lyric[_state.key];

  if (i) {
    buffer = toRatio(buffered.end(i-1) / duration);
  }
  const played = toRatio(currentTime / duration);
  setAudioData({ ..._state, buffer, played })

  if (lyric) {
    lyricFocus(currentTime, lyric, setActive)
  }
}

const toRatio = (n) => (n * 100)
