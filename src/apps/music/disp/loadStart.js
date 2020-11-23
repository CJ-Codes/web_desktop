import { loadLyric } from './';

export const loadStart = (
  { index, _songs, _lyric },
  setActive, addLyrics
) => {
  const { lrcUrl, access } = _songs[index];
  let isLoading = false;

  if (lrcUrl && !_lyric[access]) {
    isLoading = true;
    loadLyric(lrcUrl, _lyric, access, addLyrics)
  }

  setActive(0);
  addLyrics({
    ..._lyric, isLoading, current: access,
  });
}