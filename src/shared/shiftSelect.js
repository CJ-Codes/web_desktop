import { changeSelected } from './';

export function shiftSelect({ id, apps, state }) {
  // 获取图标映射地图, 并压平二维数组
  const iconsMap = state.get('iconsMap').flatten(1);
  // 上次点选的图标, 不存在则取映射地图的第一个
  const action = state.get('active') || iconsMap.get(0);
  const prevSelected = state.get('selected');

  // 获取索引值
  const _start = iconsMap.indexOf(action);
  // id 为当前点选图标的 id
  const _end = iconsMap.indexOf(id);

  // 最小索引值为起始位置
  const begin = Math.min(_start, _end);
  const end = Math.max(_start, _end);

  // 确认选中范围图标
  const selected = iconsMap.slice(begin, end+1).filter(n => n);
  console.log(selected)
  // 找出范围外上轮已选中的图标
  const unselect = prevSelected.filterNot(x => ~selected.indexOf(x));
  // 将范围内上轮已选中的排除, 剩余的则为本轮要设为选中的图标
  const unselected = selected.filterNot(x => ~prevSelected.indexOf(x));

  // 设置图标为选中状态
  apps = changeSelected(
    // 本次范围内要选中图标的id列表
    unselected,
    // 将上轮选中本次未选中的取消选中
    changeSelected(unselect, apps), // apps
    true // 状态
  )

  return ({
    apps, selected,
  })
}
