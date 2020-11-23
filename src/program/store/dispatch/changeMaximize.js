import { fromJS } from 'immutable';

import { defaultView } from '../../func';

import {
  viewSize,
  maximizeState,
  cacheState,
  rename,
} from '../action';

// 最大化状态切换
export const changeMaximize = (state, dispatch) => {
  const cache = state.get('cache');
  // 切换后的状态
  const maximize = state.get('maximize') ? 0 : 1;
  const change = maximize
    // 最大化
    ? {}
    // 没有缓存状态则用默认状态
    : (cache.size && cache) || fromJS(defaultView());

  // 更新
  dispatch(viewSize(change));
  dispatch(maximizeState(maximize))
  // 全屏切换恢复光标状态
  if (state.get('resizeName')) {
    dispatch(rename(''))
  }
  // 最大化前保存当前状态
  if (maximize) dispatch(cacheState(state.get('change')));
}