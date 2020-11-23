
/**
 * cancel
 * @param {immutable} removes 可循环的对象皆可, 但其值为图标的 id
 * @param {immutable} apps
 * @param {boolean} stat 默认为 false
 */
export function changeSelected(removes, apps, stat = false) {
  return apps.withMutations(map => {
    removes.forEach(key => {
      if (key) {
        map.setIn([key, 'isSelected'], stat)
      }
    })
  })
}