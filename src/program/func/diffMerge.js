
// 合并新属性
/*
  形参 change 为鼠标移动后的新对象
  state 里的 change 为鼠标按下时的数据
*/
export function diffMerge(mouseY, state, change) {
  // cache
  const top = state.getIn(['cache', 'top']);
  // 区分上下线
  const upDownLine = window.innerHeight /2;
               const newData = mouseY > upDownLine
    ? {
      top,
      height: change.get('height') - top
    }
    : {
      height: top +state.getIn(['cache', 'height']) - change.get('top')
    };

  return change.merge(newData)
}