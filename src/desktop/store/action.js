import { Types } from './';

// 图标映射地图
export const mapData = iconsMap => ({
  type: Types.CHANGE_ICONS_MAP,
  iconsMap,
})

// 点选的图标
export const activeID = active => ({
  type: Types.CHANGE_ACTIVE_ID,
  active,
})

// 更新选中数据
export const selectedData = selected => ({
  type: Types.CHANGE_SELECTED,
  selected,
})
