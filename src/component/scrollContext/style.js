import styled from 'styled-components';

export const ContextArea = styled.div `
  height: 100%;
  position: relative;
  overflow: hidden;

  .scroll {
    width: calc(100% + ${ ({ sb }) => (sb) }px); /* 加上滚动条宽 */
    height: 100%;
    position: relative;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  ._context {
    width: 100%;
    height: auto;
    font-size: 16px;
  }
`

/* // 滚动条
export const ScrollBar = styled.div `
  
` */