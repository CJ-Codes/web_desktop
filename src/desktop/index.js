import React, { useEffect, useState, useContext, useReducer } from 'react';
import { DesktopContainer } from './style';
import { AppIcon } from '../component/';
import { GlContext } from '../store/'

import { useFetcher } from '../tools/';
import { dragDrop, cursorDragState } from './func/';
import { defaultState, Action } from './store/';
import {
  changeIcons,
  choice,
  frameSelect,
  startApp,
  cancelSelectedAll,
} from './store/dispatch';

function Desktop ({ size }) {
  const
    // 用于区分 mousedown 和 click
    [isClick, setClick] = useState(true),
    // 全局
    { glState, glDispatch } = useContext(GlContext),
    data = useFetcher('/api/apps.json'),
    [state, dispatch] = useReducer(Action, defaultState),
    apps = glState.get('data'),
    disp = [dispatch, glDispatch];

    // 数据初始化、窗口大小变化 更新
    useEffect(() => {
      if (!size || !data) return; // null
      changeIcons(apps, data, size, disp)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [size, data])

  return (
    <DesktopContainer
      onMouseDown={ event => frameSelect({ event, state, apps, size, disp, setClick }) }
      onDragOver={ cursorDragState }
      // onDrop={ e=> {console.log(e.dataTransfer.getData('object'))}}
      onDragStart={ event => dragDrop({ event, state, apps, size, disp }) }
      onClick={ () => { cancelSelectedAll(isClick, apps, state, disp) } }
    >
    {
      apps.map((info, id) => {
        return (
          <AppIcon
            key={ id }
            info={ info }
            size={ size }
            title={ id }
            draggable
            onClick={ event => { startApp(event, id, glState, glDispatch) } }
            onMouseDown={ e => choice({e, id, apps, state, disp}) }
          />
        )
      }).valueSeq()
    }
    </DesktopContainer>
  )
}

export default Desktop