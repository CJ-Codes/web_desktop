import { changeSelected, shiftSelect } from './';


/**
 * 点选图标
 * @param {MouseEvent} e
 * @param {} param1 { id, state }
 * @returns {object} { icons, selected, active } shift连选时 active 是 undefined
 */
export function selectIcon({ e, ...args }) {
  return e.shiftKey
    ? shiftSelect(args)
    : defaultSelect(args, e.ctrlKey);
}

/**
 * 点选图标
 * state 必须要有 data、selected、active
 * @param {object} param0
 * @param {boolean} isCheck 是否按下 Ctrl 键
 * @returns {immutable}
 */
function defaultSelect({ id, apps, state }, isCtrl) {
  let selected = state.get('selected');
  // 选中列表是否已存在该 id
  const index = selected.indexOf(id);
  // 当前点选的图标如果已选中 则返回 false
  // 该值为其下个状态
  const next = !~index;

  if (isCtrl) {
    const method = next ? 'push' : 'remove';
    // 存在 则删除 反之添加
    selected = selected[method](next ? id : index);
    apps = apps.setIn([id, 'isSelected'], next);
  }
  // 不为选中状态
  else if (next) {
    // 取消所有选中
    apps = changeSelected(selected, apps, false).setIn([id, 'isSelected'], next);
    // 清空选中组 添加当前id
    selected = selected.withMutations(map => (
      map.clear().push(id)
    ))
  }

  return ({ id, apps, selected })
}