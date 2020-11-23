import styled from 'styled-components';
import {
  padding,
  padding2,
  head_height,
  content_size,
} from '../constant';

export default styled.div `
  position: relative;
  float: left;
  width: ${ content_size }rem;
  height: 100%;
  margin-left: ${ padding2 }rem;
  background: transparent;
  box-sizing: border-box;

  .event {
    position: absolute;
    width: ${ head_height }rem;
    left: -${ padding }rem;
    height: 100%;
    z-index: 99;
  }

  .hov:hover + .bg-color {
    background: currentColor; /* from color inherit */
  }

  .bg-color {  /* hover highlight */
    position: absolute;
    top: -${ padding }rem;
    left: -${ padding }rem;
    width: ${ head_height }rem;
    height: ${ head_height }rem;
    color: inherit;
    background: transparent;
    /* pointer-events: none; */  /* IE 11*/
  }

  ::before, ::after {
    content: "";
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
    width: 100%;
    height: .2rem;
    margin: auto;
    color: white; /* button color quote */
    background: currentColor;
    z-index: 9;
  }
`

// close
export const close = styled.div `
  color: hsla(0, 100%, 50%, .5);

  ::before {
    transform: rotate(45deg) /* \ */
  }

  ::after {
    transform: rotate(-45deg) /* / */
  }
`

// shrink
export const shrink = styled.div `
  color: hsla(240, 90%, 58%, .5);

  ::before { /* - */
    left: .2rem; right: auto;
    width: 80%;
    transform: none;
  }

  ::after { /* > */
    left: auto; right: .5rem;
    width: 55%;
    height: 55%;
    background: transparent;
    border-top: .2rem solid;
    border-right: .2rem solid;
    transform: rotate(45deg);
  }
`
