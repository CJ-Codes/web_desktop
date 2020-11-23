import React, {
  useEffect, useReducer, useContext
} from 'react';
import { GlContext } from '../store/';
import { Header, Content } from './component/';
import { CSSTransition } from 'react-transition-group';

import { Container } from './style';
import {
  privateState,
  privateReducer,
  publicState,
  publicReducer
} from './store';

import {
  changeMaximize,
  resizeView,
  dragDrop,
  cursorState,
  correctCursor,
  buttonSwitch,
  entered,
  exited,
} from './store/dispatch/';

// Program
export default function Program({
  id, focusName, info, ...args
}) {
  // 全局状态
  const { glState, glDispatch } = useContext(GlContext);
  // 公共状态
  const [publState, publDispatch] = useReducer(publicReducer, publicState);
  // 私有状态
  const [state, dispatch] = useReducer(privateReducer, privateState);
  const resizename = state.get('resizeName');
  const isResize = glState.get('isResize');
  const opened = publState.get('opened');
  const minView = publState.get('minView');
  const opener = glState.getIn(['appsState', id]);
  const appear = opener.get('appear');
  const curAct = opener.get('act');
  const stat = [state, glState];
  const disp = [dispatch, glDispatch];

  // 光标状态
  useEffect(() => {
    // 在调整大小时保证光标在全页面的状态
    document.body.className = isResize ? resizename : '';
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResize])

  console.log(appear, curAct)

  return(
    <CSSTransition
      in={ appear }
      classNames={ curAct }
      timeout={ 500 }
      appear
      onEntered={ () => { entered(opened, publDispatch) }}
      onExited={ () => {
        exited(curAct, id, glState, glDispatch)
      }}
    >
    <Container
      { ...args }
      className={
        resizename+' '+focusName+' '+(appear ? '' : curAct)
      }
      info={ info }
      change={ state.get('change').toJS() }
      onMouseDown={ e => { resizeView(e, id, minView, state, disp) }}
      onMouseMove={ e => { cursorState(e, stat, dispatch) }}
    >
      <Header
        is={ glState.get('isDrag') || isResize }
        info={ info }
        onDblClick={ () => { changeMaximize(state, dispatch) }}
        onMouseDown={ e => { dragDrop(e, state, disp) }}
        onClickButton={ type => buttonSwitch(type, id, stat, glDispatch) }
        onMouseButton={ () => { correctCursor(resizename, dispatch) }}
      />
      <Content
        info={ info }
        opened={ opened }

        win={ args.view }
        resize={ isResize }
        maximize={ state.get('maximize') }
      />
    </Container>
    </CSSTransition>
  )
}
