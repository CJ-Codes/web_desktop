import { dragState } from '../../../store';

import { defaultView } from '../../func';

import { viewSize, beyondTop } from '../action';
import { touchEdge } from './touchEdge';

/**********
 * 拖拽视图
 * 鼠标在 header 按下时
 */
export const dragDrop = (event, state, [disp, glDisp]) => {
  // 调整视图大小则返回
  if (state.get('resizeName') || event.target.className.includes('hov')) return;
  const
    cache = state.get('cache'),
    change = state.get('change'),
    maximize = state.get('maximize'),
    _cache = cache.toObject();

  let size = change.toObject();

  // 当前最大化状态
  if (maximize) {
    const { clientX: x } = event;
    const ratio = cursorInViewPos(x, size);
    // 在最大化状态下拖拽, 没有缓存时, 使用默认大小
    size = cache.size ? _cache : defaultView();
    size.left = x - ratio * size.width;
    size.top = 0;
  }

  // 鼠标移动
  const _move = ({ e, x, y }) => {
    // 往左向上为负数, 往右向下为正数
    const nowPos = {
      ...size,
      left: size.left + x,
      top: size.top + y,
    }

    // 更新视图位置
    disp(viewSize(change.merge( nowPos )));
    // 更新全局拖拽状态
    glDisp(dragState(true));
  }

  // 鼠标松开
  const _up = () => {
    // 取消拖拽状态
    glDisp(dragState(false));
    // 鼠标抬起时视图如top为负值则归 0
    disp(beyondTop());
  }

  touchEdge({
    event, state, _move, _up, disp, glDisp
  });
}

// 拖拽鼠标在视图x轴的位置
const cursorInViewPos = (x, size) => {
  // 视图宽 默认100
  const width = size.width || window.innerWidth;
  const xpos = x - (size.left || 0);
  // 百分比
  return xpos / width;
}

