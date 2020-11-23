import React, { useRef } from 'react';
import { Loading } from '../../style';
import { Container } from './style';
import { scrollLyric } from './scrollLyric';

export default ({
  lyrics, index, view, onLrcPanel,
}) => {
  const ref = useRef(null);
  const { isLoading, current } = lyrics;
  const curLrc = lyrics[current];
  const y = scrollLyric(ref, view, index);

  return (
    <Container className="lyric">
    {
      curLrc
      ?
      <ul
        ref={ ref }
        style={{ transform: `translateY(${y}px)`}}
      >
      {
        curLrc.map(([k, v], i) => (
          <li
            key={ k }
            className={ index === i ? 'active' : '' }
          >{ v }</li>
        ))
      }
      </ul>
      :
      <div className="wrap">
      {
        isLoading
        ? <Loading className="loading" />
        : current ? <span>暂无歌词</span> : '♪'
      }
      </div>
    }
    <div
      className="onOff"
      onClick={ () => onLrcPanel?.() }
    >Lyric</div>
    </Container>
  )
}