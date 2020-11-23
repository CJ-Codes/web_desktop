// 非最大化 小窗口默认状态
export function defaultView() {
  const
    view = window.innerWidth,
    // 宽度占屏幕的百分之56
    width = .56 * view,
    // 高度 3:2
    height = width / 3 * 2,
    left = view /2 - width /2;

  return { width, height, left, top: 0 }
}