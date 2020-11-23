import styled from 'styled-components';

const size = 76;
const defalutSize = 55;
const right = (size - defalutSize) /2;

export const Container = styled.aside `
  width: ${ defalutSize }px;
  height: ${ defalutSize }px;
  position: absolute;
  right: ${ right + 5 }px;
  bottom: 5vh;
  border-radius: 100vh;
  background: #e0e0e0;
  box-shadow: 0 0 3px hsla(0, 0%, 0%, .1);
  transform: rotate(180deg);
  box-sizing: border-box;
  transition: .6s;
  visibility: hidden;
  overflow: hidden;
  z-index: -1;

  &.show {
    visibility: visible;
    z-index: 2;
  }

  &.spread {
    width: ${ size }px;
    height: 90vh;
    right: 5px;
    visibility: visible;
    z-index: 2;

    .switched {
      height: ${ size/1.65 }px;
    }

    .ident {
      display: flex;
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 0;
      box-shadow: 0 2px 5px hsla(0, 0%, 0%, .3);
      transform: translate(0);
      justify-content: center;
      align-items: center;

      ::before, ::after {
        content: "";
        position: absolute;
        width: 15px;
        height: 3px;
        background: hsla(0, 0%, 100%, .7);
        transform: rotate(45deg);
      }

      ::after {
        transform: rotate(-45deg);
      }
    }
  }

  /* children */
  .switched {
    width: 100%;
    height: ${ defalutSize }px;
    display: flex;

    div {
      width:  ${ defalutSize/2 }px;
      height: ${ defalutSize/2 }px;
      margin: auto;
      border-radius: 100vh;
      background: #efefef;
      transition: .5s;
    }

    :hover .ident {
      background: hsla(0, 100%, 50%, .5);
    }
  }

  > .context {
    width: 100%;
    height: calc(100% - ${size/1.65}px);
    overflow: hidden;
  }

  /* icon */

  .disp-enter,
  .disp-exit-active,
  .disp-exit-done {
    width: 0;
    overflow: hidden;
  }

  .disp-enter-active,
  .disp-enter-done,
  .disp-exit {
    width: 100%;
  }

  .disp-exit-active,
  .disp-exit-done {
    width: 0;
  }

  .disp-exit-active,
  .disp-enter-active {
    transition: .6s;
  }

  .iconTier {
    width: ${ size-6 }px;
    height: ${ size-6 }px;
    margin: 3px 3px 0;
    box-sizing: border-box;
    transform: rotate(-180deg);
  }

`;
