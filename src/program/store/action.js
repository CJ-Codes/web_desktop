import { Types } from './';

// 直接修改视图的大小和位置
export const viewSize = change => ({
  type: Types.CHANGE_VIEW_SIZE,
  change,
});

// 调整视图大小时光标的状态 及 对应位置的函数调用名
export const rename = name => ({
  type: Types.CHANGE_RESIZE_NAME,
  name,
});

// 鼠标按下移动的距离
export const distAction = dist => ({
  type: Types.CHANGE_MOVE_DIST,
  dist,
});

// 备份 change
export const cacheState = cache => ({
  type: Types.CHANGE_CACHE_VIEW,
  cache,
});

// 最大化状态
export const maximizeState = maximize => ({
  type: Types.CHANGE_MAXIMIZE,
  maximize,
});

// 当前是否为最小视图
export const minViewState = isMin => ({
  type: Types.CHANGE_IS_MIN_VIEW,
  isMin,
});

// 拖拽时视图超出顶部
export const beyondTop = () => ({
  type: Types.VIEW_IS_BEYOND_VISIBLE,
})

// open \ close \ shrink
export const openerState = opener => ({
  type: Types.APP_APPEAR_STATE,
  opener,
})

// PUBLIC

export const openedState = (opened) => ({
  type: Types.CHANGE_OPENED,
  opened,
})
