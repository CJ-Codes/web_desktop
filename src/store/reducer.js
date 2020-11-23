import { fromJS } from 'immutable';
import { Types } from './';

// 全局状态
export const globalState = fromJS({
  data: {},                   // apps data
  focus: '',                  // 当前获得焦点的应用窗口的 id(其 index将置于顶层)
  usings: [],                 // 运行中的应用
  appsState: {},              // 运行中的应用窗口状态
  backstage: [],              // 后台
  isSpread: false,

  preview: {},                // 预览图大小视图
  isDrag: false,              // 当前是否在拖拽
  isResize: false,            // 是否在调整视图大小
  isEdge: false,              // 上两个状态为 true时光标移到窗口边缘

});

// redcuer
export function dispAction(state, act) {
  switch (act.type) {
    // 桌面图标数据状态更新
    case Types.CHANGE_ICONS_DATA:
      return state.set('data', act.data);

    // 更新当前运行中的 App ID
    case Types.START_APP:
      return state.set('usings', act.usings);

    case Types.APP_APPEAR_STATE: {
      return state.set('appsState', act.appsState);
    }

    // 当前获得焦点的应用窗口 id
    case Types.CHANGE_FOCUS_APP:
      return state.set('focus', act.id);

    // 拖拽状态
    case Types.CHANGE_IS_DRAG:
      return state.set('isDrag', act.isDrag);

    // 视图调整
    case Types.CHANGE_IS_RESIZE_VIEW:
      return state.set('isResize', act.isResizeView);

    // 触碰边缘
    case Types.CHANGE_IS_EDGE:
      return state.set('isEdge', act.isEdge);

    // 预览图大小
    case Types.PREVIEW_SIZE:
      return state.set('preview', act.view);

    // 后台数据增减
    case Types.CHANGE_BACKSTAGE:
      return state.set('backstage', act.backstage);

    // 后台列表展开状态切换
    case Types.BACKSTAGE_SWITCH:
      return state.set('isSpread', act.spread);

    default:
      return state
  }
}