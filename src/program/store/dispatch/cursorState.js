import { getResizeName } from '../../func';

import { rename } from '../action';

// cursorState :: MouseEvent -> boolean -> immutable -> (object -> void) -> void
export const cursorState = (event, [state, glState], dispatch) => {
  // 全屏
  const is = (state.get('maximize') === 1) || glState.get('isDrag') || glState.get('isResize');
  // 拖拽、调整视图大小都不再往下执行
  if (is) return;
  const name = getResizeName(event);

  dispatch(rename(name))
}