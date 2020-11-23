import React, { useState, useContext } from 'react';
import { MainView } from './style';

import { GlContext } from '../../../store';
import { CSSTransition } from 'react-transition-group';

const temp = {};
const switchStat = (el, set) => {
  let off = false;
  el.ontransitionend = function () {
    if (off) return;
    off = true;
    set(true)
  }
}

export default () => {
  const { glState: state } = useContext(GlContext);
  const { prev, ...view } = state.get('preview').toObject();
  const { mode, edge } = view;
  // 出现动画是否结束
  const [end, setEnd] = useState(false);
  const corner = mode === 'corner';
  const switched = mode === 'switch';

  if (!corner) { temp.view = view }

  return (
    <CSSTransition
      in={ state.get('isEdge') }
      timeout={ 350 }
      classNames="preview"
      onEntered={ el => { switchStat(el, setEnd) }}
      onExited={ () => { setEnd(false) }}
      unmountOnExit
    >
      <MainView
        theme={ corner && !end ? temp.view : view }
        _end={ end && corner }
        className={ switched ? mode +'-'+ edge : '' }
      ></MainView>
    </CSSTransition>
  )
}