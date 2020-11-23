import React from 'react';
import ButtonStyle, * as pattern from './style';

export default ({
  is,
  type,
  onClickButton,
  onMouseButton,
}) => (
  <ButtonStyle as={ pattern[type] }>
    <div
      className={ is ? "event" : "event hov" }
      onClick={ e => { !is && func(e, onClickButton, type) } }
      onDoubleClick={ e => stopBubble(e) }
      onMouseMove={ e => func(e, onMouseButton) }
    ></div>
    <div className="bg-color"></div>
  </ButtonStyle>
)

// 阻止事件向上传播
const stopBubble = e => { e.stopPropagation() };

const func = (e, fn, param) => {
  if (typeof(fn) === 'function') fn(param);
  stopBubble(e);
}
