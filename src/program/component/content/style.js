import styled from 'styled-components';
import { head_height} from '../constant';

export const ContextArea = styled.section `
  height: calc(100% - ${ head_height }rem);
  position: relative;
  background: white;
  overflow: hidden;

  .empty {
    display: flex;
    height: 100%;
    font-size: 5rem;
    color: hsl(0, 0%, 75%);
    justify-content: center;
    align-items: center;
  }
`