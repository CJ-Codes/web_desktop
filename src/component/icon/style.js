import styled from 'styled-components';

const padding = 0.5;
// 包裹层
export const IconContainer = styled.div.attrs(({
  size: { width, height }, xpos, ypos
}) => ({
  style: {
    width: `${ width || 0 }px`,
    height: `${ height || 0 }px`,
    transform: `translate(${ xpos }px, ${ ypos }px)`
  }
})) `
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  padding: ${ padding }rem;
  border-radius: .3rem;
  text-align: center;
  box-sizing: border-box;
  user-select: none;
  overflow: hidden;

  ::after {
    content: "";
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
  }

  &.checked { /* 选中 */
    background: hsla(240, 89%, 38%, .55)!important;
  }

  :hover {
    background: hsla(240, 75%, 45%, .2);
  }
`

// 显示图片
const fMargin = 0.6;
const space = 2 * padding + fMargin;

export const Figure = styled.figure.attrs(({
  size: { width }
}) => ({
  style: {
    height: `calc(${ width }px - ${ space }rem)`
  }
})) `
  position: relative;
  width: calc(100% - ${ fMargin }rem);
  margin: 0 auto;
  overflow: hidden;

  img {
    position: absolute;
    bottom: 0;
    height: auto;
  }
`

// 标题
export const Figcaption = styled.figcaption `
  width: 100%;
  margin-top: .5rem;
  font-size: 1.3rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`