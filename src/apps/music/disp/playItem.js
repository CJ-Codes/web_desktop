export const playItem = (
  audio,
  { access },
  index,
  setAudioData
) => {
  let {
    _state: {
      key, state, loading, played, buffer,
    }
  } = audio;

  if (key === access) {
    state = audio.paused ? 'play' : 'pause';
    audio[state]();
  } else {
    state = 'pause';
    loading = true;
    played = buffer = 0;
    audio.src = access;
    audio.index = index;
  }

  setAudioData({
    state, key: access, loading, played, buffer,
  })
}