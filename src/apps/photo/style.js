import styled from 'styled-components';


export const Container = styled.div `
  width: 100%;
  padding: 0 5px 5px;
  background: white;
  overflow: hidden;

  .cover {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`

export const Item = styled.div.attrs(({
  width, height
}) => ({
  style: {
    width: width+'px',
    height: height+'px',
  }
})) `
  float: left;
  margin-top: 5px;
  margin-right: 5px;
  background: #${ ({ bgc }) => bgc };

  &.focus {
    position: relative;
    z-index: 9;
  }

  &.hov:hover {
    opacity: .8;
  }

  /*  */
  div {
    height: 100%;
    transition: .5s;

    ::after {
      content: "";
      display: block;
      height: 100%;
      transform: translateY(-100%);
    }
  }

`