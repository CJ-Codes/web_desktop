import React, { useState, useEffect } from 'react';
import { useFetcher } from '../../tools/';
import { ScrollContext } from '../../component/';
import { Container, Item } from './style';
import { inital, visibleSize } from './disp/';

const sw = { allow: true }
export default ({ view, setDisplay }) => {
  const urls = useFetcher('/api/images.json');
  const [freeze, setFreeze] = useState(null);
  const [imgs, setImgs] = useState([]);
  const [focus, setFocus] = useState(null);

  useEffect(() => {
    visibleSize(view, imgs, setImgs);
    setFocus(false);
    setFreeze(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view])

  useEffect(() => {
    if (urls) inital(view, urls, setImgs)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urls])

  useEffect(() => {
    if (imgs.length) setDisplay(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgs])

  return (
    <ScrollContext freeze={ freeze }>
    <Container
      onClick={ e => {
        const cur = e.target.firstChild;
        const key = cur?.src;
        if (key && sw.allow) {
          sw.allow = false;
          const result = key !== focus?.key && key;
          setFocus(result && itemPos(cur, key, view));
          setFreeze(!!result);
        }
      }}
      onTransitionEnd={ (e) => {
        if (!sw.allow) {
          sw.allow = true;
        }
      }}
    >
    {
      imgs.map(({
        url, width, height, bgc
      }, i) => {
        const isFocus = focus?.key === url;

        return (
        <Item
          className={ isFocus ? 'focus' : 'hov' }
          key={ url }
          view={ view }
          width={ width }
          height={ height }
          bgc={ bgc }
        >
          <div
            style={ isFocus ? itemStyle(focus) : {} }
          >
            <img src={ url } alt="" />
          </div>
        </Item>
      )})
    }
    </Container>
    </ScrollContext>
  )
}

function itemPos (e, key, [w, h]) {
  const {
    offsetTop: top, offsetLeft: left,
    offsetWidth: width, offsetHeight: height,
  } = e;

  const scrollTop = e.offsetParent.scrollTop;
  const x = (w - width) /2 - left;
  const y = (h - height) /2 - (top - scrollTop);

  const wscale = (0.8 * w) / width;
  const hscale = (0.8 * h) / height;
  const scale = wscale * height > h ? hscale : wscale;

  return { key, scale, x, y }
}

function itemStyle ({ scale, x, y }) {
  return {
    transform: `translate(${x}px, ${y}px) scale(${scale})`
  }
}