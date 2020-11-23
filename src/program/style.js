import styled from 'styled-components';

const pos = (n=0) => typeof n !== 'number' ? n : n+'px';
const translate = ({ left, top }) => (`
  translate(${ pos(left) }, ${ pos(top) })
`)

const styles = ({ width, height, left, top }) => (
  width
  ? {
    width: width,
    height: height,
    transform: translate({ left, top }),
  }
  : {}
);

export const Container = styled.article.attrs(({ change }) => ({
  style: styles(change),
})) `
  width: ${ ({ view }) => view[0] }px;
  height: ${ ({ view }) => view[1] }px;
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid hsl(0,0%,80%);
  border-radius: 6px;
  box-shadow: .13em .13em .35em hsla(0, 0%, 30%, .2);
  box-sizing: border-box;
  overflow: hidden;
  user-select: none;

  &.focus {
    z-index: 999 !important;
    box-shadow: .13em .13em .5em hsla(0, 0%, 30%, .6);
  }

  /*
    opener 只有出场
    close 只有退出状态
  */

  /* 出场初始大小、位置 */
  &.opener-appear,
  /* 全屏退出变化 */
  &.close-exit-active,
  &.close-exit-done {
    width: ${ ({ size: { width } }) => width }px;
    height: ${ ({ size: { height } }) => height }px;
    opacity: 0;
    transform: translate(
      ${ ({ info }) => info.get('x') }px,
      ${ ({ info }) => info.get('y') }px);
  }

  /* 出场变化 */
  &.opener-appear-active {
    width: ${ ({ view }) => view[0] }px;
    height: ${ ({ view }) => view[1] }px;
    transform: translate(0);
    opacity: 1;
  }

  /* 小视图退出变化 */
  &._close-exit-active,
  &._close-exit-done {
    transform: ${({change}) => translate(change)} rotate3d(1, 1, 0, 35deg)!important;
    opacity: 0;
  }

  /* 全屏状态从后台出现前的初始位置 */
  &.shrink-enter,
  /* 全屏进入后台挂起的变化 */
  &.shrink {
    transform: translateX(100vw);
  }

  &.shrink-enter-active {
    transform: translateX(0);
  }

  &.shrink-enter-active,
  &.shrink-exit-active {
    transition-timing-function: ease;
  }

  /* 变化时间 */
  &.opener-appear-active,

  &.close-exit-active,
  &._close-exit-active,

  &.shrink,
  &.shrink-enter-active {
    transition-duration: .5s;
  }

  &.shrink-exit-done,
  /* 小窗口后台用canvas动画 */
  &._shrink,
  &._shrink-exit,
  &._shrink-exit-done {
    display: none;
  }
`