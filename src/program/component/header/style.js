import styled from 'styled-components';
import {
  padding,
  head_height,
  content_size,
} from '../constant';

export const HeadContain = styled.header `
  position: relative;
  height: ${ head_height }rem;
  padding: ${ padding }rem;
  box-sizing: border-box;
  overflow: hidden;
  z-index: 9;
  background: hsla(240, 81.8%, 82.7%, 0.8);
`

export const ButtonContain = styled.div `
  position: absolute;
  top: ${ padding }rem;
  right: ${ padding }rem;
  height: ${ content_size }rem;
  z-index: 1;
`
