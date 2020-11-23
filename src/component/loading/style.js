import styled from 'styled-components';

const size = 316;
export const Container = styled.div `
  width: 100vw;
  height: 100vh;
  display: flex;
  position: absolute;
  left: 0; top: 0;
  justify-content: center;
  align-items: center;
  background: white;
  z-index: 99;

  &.loading-exit-active,
  &.loading-exit-done {
    opacity: 0;
    transform: scale(2);
    transition: 800ms;
  }

  .fixed {
    width: ${ size }px;
    height: ${ size }px;
    position: relative;

    div {
      width: 40px;
      position: absolute;
      padding: 2px 5px;
      border: 2px solid #222;
      border-radius: 3px;
      background: white;
      font-size: 14px;
      text-align: center;
      z-index: 9999;

      ::before {
        content: "";
        position: absolute;
        top: -7px; left: 50%;
        width: 8px;
        height: 8px;
        border: 2px solid #222;
        border-width: 2px 0 0 2px;
        background: white;
        transform: translate(-50%) rotate(45deg);
      }
    }
  }

  canvas {
    position: absolute;
    left: 0; top: 0;
  }

  svg {
    opacity: .5;
  }
`