import { Types } from './index';

// 拖拽状态
export const dragState = isDrag => ({
  type: Types.CHANGE_IS_DRAG,
  isDrag,
})

// 视图调整状态
export const resizeState = isResizeView => ({
  type: Types.CHANGE_IS_RESIZE_VIEW,
  isResizeView,
})

// isDrag、isresizeView 为 True时
// 光标触碰或离开窗口边缘则更新
export const edgeState = isEdge => ({
  type: Types.CHANGE_IS_EDGE,
  isEdge,
})

// 预览图
export const previewSize  = view => ({
  type: Types.PREVIEW_SIZE,
  view,
})

// icons 图标
export const iconsData = data => ({
  type: Types.CHANGE_ICONS_DATA,
  data,
})

// start app
export const usingData = usings => ({
  type: Types.START_APP,
  usings,
})

// 获得焦点的应用窗口 id
export const focusAppId = id => ({
  type: Types.CHANGE_FOCUS_APP,
  id,
})

export const changeAppState = appsState => ({
  type: Types.APP_APPEAR_STATE,
  appsState,
})

export const updateBackstage = backstage => ({
  type: Types.CHANGE_BACKSTAGE,
  backstage,
})

export const switchSpread = spread => ({
  type: Types.BACKSTAGE_SWITCH,
  spread,
})