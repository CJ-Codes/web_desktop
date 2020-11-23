import { fromJS } from 'immutable';
import { Types } from './';

export const defaultState = fromJS({
  iconsMap: [],         // mapping icons
  selected: [],         // selected list
  active: "",           // current active icon ID
  isDrag: false,        // current whether is drag state
})

export const Action = (state, action) => {
  switch (action.type) {

    // 桌面图标映射地图更新
    case Types.CHANGE_ICONS_MAP:
      return state.set('iconsMap', action.iconsMap);

    // 当前点选的图标
    case Types.CHANGE_ACTIVE_ID:
      return state.set('active', action.active);

    // 选中的图标列表
    case Types.CHANGE_SELECTED:
      return state.set('selected', action.selected);

    default:
      return state;
  }
}
