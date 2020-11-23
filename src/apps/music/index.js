import React, { useState, useEffect } from 'react';
import { useFetcher } from '../../tools/';
import { Song, Lyric } from './component/';
import { Container } from './style';
import {
  playItem,
  loadStart,
  timeupdate,
  ended,
} from './disp/';

const inital = {
  key: null,
  state: null,
  buffer: 0,
  played: 0,
  loading: false,
}

export default ({ view, setDisplay }) => {
  const [audio] = useState(document.createElement('audio'));
  const [audioData, setAudioData] = useState(inital);
  const [lrcPanel, setLrcPanel] = useState(false);
  const [lyrics, addLyrics] = useState({});
  const [active, setActive] = useState(0);
  const songs = useFetcher('/api/musics.json');

  audio._songs = songs;
  audio._lyric = lyrics;
  audio._state = audioData;

  useEffect(() => {
    if (songs) { setDisplay(true) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songs])

  useEffect(() => {
    // 媒体开始加载
    audio.onloadstart = () => {
      loadStart(audio, setActive, addLyrics)
    }

    // 有足够的数据可供播放
    audio.oncanplay = () => {
      const { _state } = audio;

      audio.play();
      setAudioData({
        ..._state,
        state: 'play',
        loading: false,
      })
    }

    // 播放进度、歌词
    audio.ontimeupdate = () => {
      timeupdate(audio, setAudioData, setActive)
    }

    // 播放结束
    audio.onerror = audio.onended = () => {
      setActive(0);
      ended(audio, setAudioData, addLyrics, inital)
    }

    // 御载
    return () => {
      audio.isUnmounted = true;
      audio.pause()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container
      view={ view }
      className={ lrcPanel ? 'normal' : 'hidden' }
    >
      <Song
        state={ audioData }
        songs={ songs }
        onPlayItem={ (c, i) => {
          playItem(audio, c, i, setAudioData)
        }}
      />
      <Lyric
        view={ view }
        index={ active }
        lyrics={ lyrics }
        onLrcPanel={ () => { setLrcPanel(!lrcPanel) }}
      />
    </Container>
  )
}
