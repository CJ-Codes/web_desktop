// 光标触碰窗口边缘
// 需在鼠标按下时建立 prevState 对象: {edge: null}
// size 为调整视图时大小传入 { width, left }
export function calcEdge(event, prevState, size) {
  const { clientX: xpos, clientY: ypos } = event;
  const { innerWidth: vw, innerHeight: vh } = window;

  const { edge: prevEdge, code } = prevState;
  // 检查光标是否在窗口边缘
  const current = inEdge(prevEdge, [xpos, ypos], [vw, vh]);
  const { edge, x, y } = current;
  const excludeEdge = size && (edge === 'left' || edge === 'right')


  // 非调整视图状态接触底边, 即返回
  if ((edge === 'bottom' && !size) || excludeEdge) return;
  // 光标触碰窗口边缘, 并不同于上次
  if (edge && prevEdge !== edge) {
    const
      // size 改变视图大小时才存在
      width = size ? size.get('width') : (edge === 'top' ? vw : vw/2),
      // 在右侧时, 位置起点在屏幕的中间
      left = size ? size.get('left') : (edge === 'right' ? vw/2 : 0);

    // 设置状态
    prevState.edge = edge;
    // 当前模式
    const mode = prevEdge ? 'switch' : (size && 'resize') || 'drag';

    return viewSize({ mode, prevEdge, width, vh, left, edge, x, y });
  }
  // out edge
  else if (prevEdge || code === 2) {
    return outEdge([x, y], [vw, vh], prevEdge, prevState);
  }
}

// 光标离开屏幕边缘
const outEdge = ([x, y], [vw, vh], edge, state) => {
  let mid, axis;
  const dist = 5;
  // 屏幕中心点
  const midX = vw /2, midY = vh /2;
  // 确认中心点 与轴向
  if (edge === 'left' || edge === 'right') {
    mid = midX; axis = x;
  } else {
    mid = midY; axis = y;
  }
  // 光标离开距离, 负数取整
  const outDist = Math.abs(mid - axis );

  if (outDist < mid - dist) {
    // 上次状态
    state.edge = null;
    return false
  }
}

// inEdge :: MouseEvent -> object
const inEdge = (pEdge, [x, y], [vw, vh]) => {
  const dist = pEdge === 'left' || pEdge === 'right' ? 5 : 0;
  const edge
       = (y <= 0 && (x > dist && x < vw - dist) && 'top')
      || (y >= vh && 'bottom')
      || (x <= 0 && 'left')
      || (x+1 >= vw && 'right') // 容差
      || null;

  return { x, y, edge }
}

// 默认视图
const viewSize = ({
  prevEdge, width, vh, left, mode, edge, x, y
}) => ({
  top: 0,
  prev: prevEdge,
  width,
  height: vh,
  left,
  mode,
  edge, x, y,
})