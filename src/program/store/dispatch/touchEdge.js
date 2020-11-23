import { fromJS } from 'immutable';

import { edgeState } from '../../../store';
import { moveDist, calcEdge, diffMerge } from '../../func';

import { viewSize, maximizeState, cacheState } from '../action';
import { changePreview } from './changePreview';

// 光标触碰窗口边缘
// is 为区分调整视图
export const touchEdge = ({
  event,
  _move, _up,
  state, minView,
  disp, glDisp,
}) => {
  const { clientX, clientY } = event;
  const resizename = state.get('resizeName');
  const maxCode = state.get('maximize');
  let change = state.get('change');

  // 区分双击
  let isMove = false;
  // 边状态
  const edge = {
    edge: null, view: null, code: maxCode
  };
  // 排除边缘
  const excludeEdges = resizename !== 'left' && resizename !== 'right';
  // 调整大小状态下 是否允许接触窗口边缘最大化
  const resizeMax = resizename && !excludeEdges;


  // 鼠标移动
  const mouseMove = (args) => { // {e, x, y}
    if (!isMove) isMove = true;
    const _change = _move(args, change);
    if (resizeMax) return;
    // event, clientX, clientY
    const { e } = args;

    // 拖拽时光标触碰窗口边缘
    let result = calcEdge(e, edge, resizename && _change);
    // 结果为对象时, 返回 Immutble

    if (result !== void 0) {
      if (result) { edge.view = fromJS(result) };

      // resize 模式 状态为 2, 并结果为 false
      if (resizename && edge.code === 2 && !result) {
        // 返回一个 change 为 cache 的 immutable 对象
        const _state = diffMerge(clientY, state, _change);
        // 重置 resize 模式的基础数据
        change = _state;
        edge.code = 0;
      }

      // drag模式, 状态码不为 0时, 复 0
      if (!resizename && edge.code !== 0) { edge.code = 0 }

    } else {
      // 光标接触边缘 预览层 出现, 但在 ‘角调整’状态下, 仍可改变视图大小
      // 此时 预览层 要随着大小变化
      if (edge.edge && resizename.length === 2) {
        result = true;
        // 提取变化值
        const left = _change.get('left');
        const width = _change.get('width');
        const mode = 'corner';
        // 合并 、返回新的 Immutable 对象
        edge.view = edge.view.merge({ left, width, mode });
      }
    }

    // 显示预览
    changePreview(result, edge, glDisp);
  }

  // 鼠标抬起
  const mouseUp = (e) => {
    _up(e);

    // 鼠标没有移动
    if (!isMove) return;
    const { edge: _edge, view } = edge;

    if (_edge) {
      // 拖拽状态 边缘为 Top 时 最大化状态码为 1 即全屏
      const newMax = !resizename && _edge === 'top' ? 1 : 2;
      // 关闭预览
      glDisp(edgeState(false));
      // 更新边缘视图
      disp(viewSize(view));
      // 最大化状态变化
      disp(maximizeState(newMax))
    } else {
      if (!resizename || excludeEdges) disp(maximizeState(0));
    }
  }
  // 当最大化状态为 0
  if (!maxCode) disp(cacheState(change));

  moveDist([clientX, clientY], mouseMove, mouseUp);
}
