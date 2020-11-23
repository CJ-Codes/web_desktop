import styled from "styled-components";

// 预览图边距
const dist = 5;
const dist2 = 2 * dist;
const get = (mode, edge) =>
(mode !== 'resize'
    ? ((edge === 'top' && dist2) || dist)
    : 0
);

const translate = ({ mode, edge, left, x, y }) => {
  x = (mode === 'resize' && x - left)
    || (edge === 'right' && left)
    || x;

    return `translate(${ x }px, ${ y }px)`
}

// 角调整
const switched = ({ width, left }, end) => (
  end
    ? {
      width,
      height: `calc(100vh - ${ dist2 }px)`,
      left: 0,
      transform: `translate(${ left }px, ${ dist }px)`,
    }
    : {}
)

export const MainView = styled.div.attrs(({ theme, _end }) => ({
  style: switched( theme, _end )
})) `
  position: absolute;
  width: 0;
  height: 0;
  left: ${ ({ theme: { left }}) => left }px;
  top: 0;
  border-radius: 5px;
  background: hsla(259.5, 100%, 92.7%, 0.5);
  box-shadow: 0 0 1rem #333;
  transform: ${ ({ theme }) => translate(theme) };
  transition: .35s;
  overflow: hidden;

  ::before, ::after {
    content: "";
    position: absolute;
    top: -50%;
    width: 20%;
    height: 200%;
    background: hsla(0, 100%, 100%, 0.2);
    transform: rotate(45deg);
  }

  ::after {
    top: -33%;
    left: 55%;
  }

  /* 动画 */

  &.preview-enter-active,
  &.preview-enter-done,
  &.preview-exit,
  &.preview-exit-active,
  &.preview-exit-done {
    width: ${ ({ theme: { width, mode, edge }}) => ( width - get(mode, edge) )}px;
    height: calc(100vh - ${ dist2 }px);
    transform: translate(${
      ({ theme: { mode, edge }}) => (
        (mode === 'drag' && edge !== 'right' && dist)|| 0) }px,
        ${ dist }px);
  }

  &.preview-exit-active,
  &.preview-exit-done {
    opacity: 0;
  }

  &.switch-left,
  &.switch-top,
  &.switch-right {
    width: ${ ({ theme: { width, mode, edge }}) => ( width - get(mode, edge) )}px;
    height: calc(100vh - ${ dist2 }px);
    top: ${ dist }px;
    left: ${ dist }px;
    transform: translate(0px);
  }

  &.switch-right {
    left: 0;
    transform: translate(50vw, 0px);
  }
`
