// 光标处于窗口边缘状态时用来确定其位置的名
// getResizeName :: MouseEvent -> string
export const getResizeName = ({
  currentTarget: el,
  clientX: x,
  clientY: y,
}) => {
  const
    edgeSize = 6,
    { width, height, left, top } = el.getBoundingClientRect(),
    right = left + width,
    bottom = top + height,

    // 四条边的结果
    edges = new Map([
      ['left', x - left],
      ['top', y - top],
      ['right', x - right],
      ['bottom', y - bottom],
    ].map(([ k, v ]) => [ k, Math.abs(v) < edgeSize ])),

    // 四个边角
    corner = [
      ['LT', ['left', 'top']],
      ['LB', ['left', 'bottom']],
      ['RT', ['right', 'top']],
      ['RB', ['right', 'bottom']]
    ].map( ([k, v]) => [ k, edges.get(v[0]) && edges.get(v[1]) ]),
    // 从角开始
    boundary = new Map([ ...corner, ...edges ]);

  for (let [key, val] of boundary.entries()) {
    // 遇到 val 为 true 时返回其 key 值
    if (val) return key;
  }

  // 没结果返回空字符串
  return '';
}
