import { fromJS } from 'immutable';
import { Types } from './';

export const privateState = fromJS({ // immutable
  resizeName: '',      // 作为 className 更改鼠标状态 and 对象函数调用
  cache: {},           // 视图最大化前保存 change, 取消最大化即切换回该视图
  change: {},          // { width height left top }

  maximize: 1,         // 0: 否, 1: 全屏, 2: 半屏
  isMinView: false,    // 窗口视图是否已为最小
  opener: {
    name: 'opener', appear: true
  },
})

export const privateReducer = (state, act) => {

  switch (act.type) {
    // 最大化状态
    case Types.CHANGE_MAXIMIZE:
      return state.set('maximize', act.maximize);

    // 窗口视图大小及偏移位置
    case Types.CHANGE_VIEW_SIZE:
      return state.set('change', fromJS(act.change));

    // 当前视图窗口是否已是最小
    case Types.CHANGE_IS_MIN_VIEW:
      return state.set('isMinView', act.isMin);

    // 鼠标移到边缘可调整视图时的光标状态
    case Types.CHANGE_RESIZE_NAME:
      return state.set('resizeName', act.name);

    // change 备份, 调整大小引用该备份
    case Types.CHANGE_CACHE_VIEW:
      return state.set('cache', act.cache);

    // 应用的显示状态
    case Types.APP_APPEAR_STATE:
      return state.set('opener', act.opener)

    // 视图超出顶部处理
    case Types.VIEW_IS_BEYOND_VISIBLE: {
      const top = state.getIn(['change', 'top']);

      return top < 0
        ? state.setIn(['change', 'top'], 0)
        : state
    }

    default:
      return state
  }
}

// PUBLIC
export const publicState = fromJS({
  viewStatus: 0,       // 0: close, 1: open, 2: shrink
  minView: [300, 200], // 窗口最小尺寸 [width, height]
  contentSize: [0, 0], // 内容区大小
  opened: false,       // 打开动画完成
})

export const publicReducer = (state, act) => {

  switch (act.type) {
    case Types.CHANGE_OPENED:
      return state.set('opened', act.opened);

    default:
      return state
  }
}