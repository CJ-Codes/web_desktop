import { resizeState, focusAppId, } from '../../../store';
import { calcView } from '../../func';
import { viewSize, minViewState } from '../action';
import { touchEdge } from './touchEdge';

/********
 * 调整视图大小
 */
export function resizeView(event, id, minView, state, [disp, glDisp]) {
  glDisp(focusAppId(id));
  //  没有调整名则返回
  if (!state.get('resizeName') || event.target.className.includes('hov')) return;
  minView = minView.toArray();

  // 移动
  const _move = ({ e, x, y }, change) => {
    const _change = calcView(minView, x, y, state, change);
    const width = _change.get('width');
    // 更新视图
    disp(viewSize(_change));
    // 视图最小尺寸
    if (width <= minView[0] || _change.get('height') <= minView[1]) {
      disp(minViewState(true))
    }

    return _change
  }

  // 松开
  const _up = () => {
    // 结束调整视图大小
    glDisp(resizeState(false));
  }

  // 当前在调整视图大小
  glDisp(resizeState(true));
  touchEdge({
    event, state, _move, _up, disp, glDisp, minView
  })
}