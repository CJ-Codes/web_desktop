import styled from 'styled-components';

const liPading = .5;
const liHeight = 3.2;
const box = 2.4;
export const Container = styled.div`
  width: 30%;
  height: 100%;
  background: white;

  > div {
    width: calc(100% + 6.5rem);
  }

  li {
    position: relative;
    width: calc(100% - 6.5rem);
    height: ${ liHeight }rem;
    box-sizing: border-box;
    cursor: default;
  }

  li:hover {
    box-shadow: 0 0 .5rem hsla(0, 0%, 0%, .3);
  }

  li:hover .duration {
    opacity: 1;
    transform: translateX(99%)
  }

  .name {
    position: absolute;
    top: 0;
    right: ${ liPading }rem;
    width: calc(100% - ${ 2*liPading }rem);
    line-height: ${ liHeight }rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: .5s;
    overflow: hidden;
  }

  /* Hover */

  .normal:hover .name,
  .pause .name,
  .play .name {
    width: calc(100% - ${box + 3*liPading}rem);
  }

  .normal:hover .wrap,
  .pause .wrap {
    transform: translate(-50%);
  }

  .play .wrap {
    transform: none;
  }
`
const xpos = (liHeight - box)/ 2;
export const SwBox = styled.div `
  position: relative;
  width: ${ box }rem;
  height: ${ box }rem;
  top: ${ xpos }rem;
  left: ${ liPading }rem;
  overflow: hidden;

  .loading {
    top: 0; right: 0;
    left: 0; bottom: 0;
    margin: auto;
  }

  .wrap {
    width: ${ 2 * box }rem;
    height: 100%;
    transition: .5s;
    transform: translate(-100%);
  }

  .wrap > div {
    float: left;
    width: ${ box }rem;
    height: ${ box }rem;
  }

  /* pause */
  .wrap > div:first-child {
    background: #db1629;

    ::before, ::after {
      content: "";
      float: left;
      width: ${box / 5}rem;
      height: 78%;
      margin-top: 11%;
      margin-left: ${box / 5}rem;
      background: white;
    }
  }

  /* play */
  .wrap > div:last-child {
    background: #1e3fa2;

    ::after {
      content: "";
      float: left;
      width: 50%;
      height: 50%;
      margin-top: 50%;
      background: linear-gradient(45deg, transparent 50%, white 50%);
      transform: translate(20%, -50%) rotate(45deg);
    }
  }
`

const color = {
  buffer: "hsla(0, 0%, 50%, .1)",
  played: "hsla(30, 100%, 50%, .5)",
}

export const Progress = styled.div.attrs(({
  proged
}) => ({
  style: {
    width: proged +'%',
  }
})) `
  position: absolute;
  left: 0; top: 0;
  width: 0;
  height: 100%;
  background: ${ ({ mode }) => color[mode] };
`

export const AudioTime = styled.div `
  display: table;
  position: absolute;
  right: 0; top: 0;
  height: 100%;
  padding: 0 .8rem;
  border: 1px solid #cecece;
  border-radius: .3rem;
  background: white;
  box-sizing: border-box;
  opacity: 0;
  transition: .5s;
  z-index: 1;

  em {
    display: table-cell;
    vertical-align: middle;
  }

  ::before {
    content: "";
    position: absolute;
    left: 0; top: 0;
    bottom: 0;
    margin: auto;
    width: ${ liHeight /3 }rem;
    height: ${ liHeight /3 }rem;
    border-left: inherit;
    border-bottom: inherit;
    background: inherit;
    transform: translateX(-50%) rotate(45deg);
  }
`