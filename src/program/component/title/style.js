import styled from 'styled-components';
import {
  head_height,
  content_size,
} from '../constant';

export const TitleContain = styled.div `
  width: calc(100% - 2 * ${ head_height }rem);
  height: 100%;
  overflow: hidden;

  > div { /* image size */
    float: left;
    width: ${ content_size }rem; /* - header pdding */
    height: ${ content_size }rem;
    overflow: hidden;
  }

  > h3 {
    float: left;
    width: calc(100% - ${ head_height + 0.5 }rem);
    line-height: ${ content_size }rem;
    margin-left: .5rem;
    font-size: 1.8rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`
