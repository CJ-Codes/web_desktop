import { playItem } from './';

export const ended = (
  audio, setAudioData, addLyrics, inital
) => {
  const { _songs, _lyric, index } = audio;
  const i = index +1;
  const c = _songs[i];

  if (c) {
    playItem(audio, c, i, setAudioData)
  } else {
    setAudioData(inital);
    addLyrics({ ..._lyric, current: null })
  }
}