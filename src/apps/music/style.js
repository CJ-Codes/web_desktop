import styled, { keyframes } from 'styled-components';

export const Container = styled.div.attrs(({
  view: [w, h]
}) => ({
  style: {
    width: w+'px',
    height: h+'px',
  }
})) `
  position: relative;
  background: white;

  > div {
    float: left;
    transition: .5s;
  }

  &.hidden {
    .songs {
      width: calc(100% - 6.2rem);
      background: hsl(0,0%,96%);
      box-shadow: 0 0 .5rem hsla(0, 0%, 20%, .3);
    }

    .lyric {
      box-shadow: none;
      background: transparent;
      right: calc(-70% + 6.2rem);

      ul, .wrap {
        visibility: hidden;
      }

      .onOff {
        transform: translateX(1.6rem);
        background: hsl(0, 0%, 96%);

        ::before {
          left: 0; right: auto;
          transform: translateX(-50%) rotate(-135deg);
        }
      }
    }
  }
`
const turn = keyframes `
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
`

export const Loading = styled.div `
  position: absolute;
  width: 75%;
  height: 75%;
  border: .3rem solid transparent;
  border-top-color: hsla(0, 0%, 0%, .5);
  border-right-color: hsla(0, 0%, 0%, .5);
  border-radius: 100%;
  background-color: transparent;
  box-sizing: border-box;
  animation: ${ turn } 800ms infinite;
`