
// 据调整名调整大小
// resizeView :: number[] -> object -> immutable
export const calcView = (minView, x, y, state, __change) => {
  const
    name = state.get('resizeName'),
    base = __change || state.get('change'),
    { width, height, left, top } = base.toObject(),

    edges = {
      // 边
      left: () => ({ width: width - x, left: left + x }),
      right: () => ({ width:  width + x }),
      top: () => ({ height:  height - y, top: top + y }),
      bottom: () => ({ height: height + y }),
      // 角
      LT: ['left', 'top'],
      LB: ['left', 'bottom'],
      RT: ['right', 'top'],
      RB: ['right', 'bottom'],
    },
    resize = edges[name],
    result = key => (sizeLimit(edges[key](), minView, base)),

    change = Array.isArray(resize)
      // 数组返回对象扩展合并
      ? Object.assign(...resize.map(k => result(k)))
      : result(name);

  return base.merge(change)
}

// view corrent
const sizeLimit = (change, min, base) => {
  let edge;
  const size = change.width
      ? ((edge = 'left'), (min = min[0]), 'width')
      : ((edge = 'top'), (min = min[1]), 'height');

  if (change[size] < min) {
    change[size] = min;

    if (change[edge] !== void 0) {
      // left + width - minWidth
      change[edge] = base.get(edge) + base.get(size) - min
    }
  }

  return change
}
