import styled from 'styled-components';

export const Container = styled.div `
  position: absolute;
  top: 0; right: 0;
  width: 70%;
  height: 100%;
  background: hsl(0, 0%, 96%);
  box-shadow: 0 0 .5rem hsla(0, 0%, 20%, .3);
  color: gray;
  font-size: 1.5rem;

  .wrap {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    font-size: 10rem;

    .loading {
      width: 5.5rem;
      height: 5.5rem;
      border-width: .8rem;
    }

    span {
      font-size: 2rem;
      color: hsl(30, 100%, 50%);
    }
  }

  .onOff {
    position: absolute;
    left: 0; top: .5rem;
    height: 2.2rem;
    padding: 0 1rem;
    color: gray;
    background: white;
    border-radius: .3rem;
    box-sizing: border-box;
    cursor: pointer;
    transition: .3s;

    ::before {
      content: "";
      position: absolute;
      right: 0;
      top: 0; bottom: 0;
      width: ${ 0.72 * 2.2 }rem;
      height: ${ 0.72 * 2.2 }rem;
      margin: auto;
      border-top: 1px solid #aaa;
      border-right: 1px solid #aaa;
      background: inherit;
      box-sizing: border-box;
      transform: translateX(50%) rotate(45deg);
    }
  }

  ul {
    transition: .5s;
  }

  li {
    line-height: 30px;
    text-align: center;
    transition: .3s;
  }

  .active {
    color: #f0a008;
  }
`
