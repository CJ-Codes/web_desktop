import React from 'react';
import { ContextArea } from './style';

// 滚动条宽
const SBW = getScrollBarWidth();

export const ScrollContext = ({
  children, freeze, onScroll
}) => (
  <ContextArea sb={ SBW }>
    <div
      className="scroll"
      style={ freeze ? { overflow: 'hidden' } : {} }
      onScroll={ e => onScroll?.(e) }
    >
      <div className="_context">{ children }</div>
    </div>
  </ContextArea>
)

// 获取滚动条宽
function getScrollBarWidth() {
  const scrollDiv = document.createElement('div');
  scrollDiv.style.overflow = 'scroll';
  // ie 没有高度或高度小于滚动条会返加0
  scrollDiv.style.height = '33px';
  document.body.appendChild(scrollDiv);

  const value = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);

  return value
}