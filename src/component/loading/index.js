import React, { useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ReactComponent as Svg } from './icon2.svg';

import { Container } from './style';
import { animate, isExpires } from './animate';

const defaultData = {
  disp: isExpires(),
  pos: [0, 0],
  progress: 0,
};

export default () => {
  const element = useRef();
  const [{
    disp, progress, pos: [x, y]
  }, setState] = useState(defaultData);

  animate(element, setState);

  return (
    <CSSTransition
      in={ disp }
      classNames="loading"
      timeout={ 800 }
      addEndListener={(e, done) => {
        e.addEventListener('transitionend', done)
      }}
      unmountOnExit
    >
    <Container ref={ element }>
      <div className="fixed">
        <Svg />
        <canvas></canvas>
        <div style={{ left:x, top:y }}>{ progress }%</div>
      </div>
    </Container>
    </CSSTransition>
  )
}