import styled, { keyframes } from 'styled-components';

const discolour = keyframes `
  0% {
    background: #09006f;
  }
  100% {
    background: #bfbff8;
  }
`

export const Container = styled.div `
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0; top: 0;
  background: white;

  div {
    width: 26px;
    height: 26px;
    border-radius: 100%;
    margin: 8px;
    animation: ${discolour} 600ms infinite;
  }

  .two {
    animation-delay: 200ms
  }
  .three {
    animation-delay: 400ms
  }
`