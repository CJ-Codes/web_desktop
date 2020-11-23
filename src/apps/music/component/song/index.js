import React from 'react';
import { ScrollContext } from "../../../../component/";
import { Loading } from '../../style';
import {
  Container, SwBox, Progress, AudioTime
} from './style';

export default ({
  songs, onPlayItem,
  state: { key, state, loading, ...other },
}) => (
  <Container className="songs">
  <ScrollContext>
  <ul>
  {
    songs && songs.map( (c, i) => {
      const { name, duration, access } = c;
      const isFocus = key === access;

      return (
      <li
        key={ access }
        className={ isFocus ? state : 'normal' }
        onClick={ () => onPlayItem(c, i) }
      >
        {isFocus && (<ProgressBar { ...other } />)}
        <SwBox className="box">
          <div className="wrap">
            <div></div>
            <div></div>
          </div>
          { isFocus && loading && <Loading className="loading" /> }
        </SwBox>

        <div className="name">{ name }</div>
        <AudioTime
          className="duration"
        >
          <em>{ format(duration) }</em>
        </AudioTime>
      </li>
    )})
  }
  </ul>
  </ScrollContext>
  </Container>
)

// 缓存、播放进度
const ProgressBar = (opts) => (
  <>
  {
    Object.keys(opts).map( k => (
    <Progress
      key={ k }
      mode={ k }
      proged={ opts[k] }
    />
    ))
  }
  </>
);

const format = (duration) => (
  toZero(~~(duration / 60)) +':'+ toZero(~~(duration % 60))
)

const toZero = n => (n > 10 ? n : '0' + n)