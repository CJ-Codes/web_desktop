/**
 state 必须有 selected、iconsMap
 */

// 框选
export function frameSelected({
  apps,
  event,
  state,
  size,
  setClick,
  disp: [disp, glDisp],
},
  changeIcons,
  changeSelected,
) {
  const
    xStart = event.clientX,
    yStart = event.clientY,
    // selected = state.get('selected'),
    choiceBox = document.createElement('div'); // 创建选框

  document.body.appendChild(choiceBox);
  // 假若页面中有选中数据则全部取消选中
  // if (selected.size) dispatch(changSelected(selected.clear()));

  // 设置鼠标移动事件
  const mouseMove = event => {
    const
      { clientX, clientY } = event,
      top = Math.min(clientY, yStart),
      left = Math.min(clientX, xStart),

      width = Math.abs(clientX - xStart),
      height = Math.abs(clientY - yStart);

    choiceBox.style.cssText = choiceBoxStyle(width, height, left, top);

    // 数据比对, 返回矩形范围内已设置完成的数据
    const { icons, selected } = rangeFilter(
      state, size, apps,
      {
        xMin: left,
        yMin: top,
        xMax: left + width,
        yMax: top + height,
      }
    );

    // 鼠标 click 事件失效
    setClick(false);
    glDisp(changeIcons(icons));
    disp(changeSelected(selected));
  }

  // 移除选框并将 move、up事件置空
  const mouseUp = () => {
    setTimeout(() => setClick(true), 0);
    document.body.removeChild(choiceBox);
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);
  }

  document.addEventListener('mousemove', mouseMove);
  document.addEventListener('mouseup', mouseUp);
}

// 从 映射地图 匹配大概范围
const rangeFilter = (state, size, apps, range) => {
  const
    { yMin, yMax } = range,
    height = size.height + size.ySpace,

    // 提取映射地图在矩形区内的大概范围数据, 并拉平二维数组
    rectArea = state.get('iconsMap')
      .slice(~~(yMin/height)/*min row*/, ~~(yMax/height)+1/*max row*/)
      .flatten(1),
    selected = state.get('selected'),
    // 确认选择框内图标
    actives = rectArea.filter(k => isInChoiceBox(k, apps, size, range)),
    // 提取选择框外上次选中的图标
    unselect = selected.filterNot(x => ~actives.indexOf(x)),
    // 选择框内可能有上次选中图标, 只将框内未选中的提取设置选中
    unselected = actives.filterNot(x => ~selected.indexOf(x)),

    icons = apps.withMutations(map => {
      // 选择框外图标取消选中
      unselect.forEach(key => map.setIn([key, 'isSelected'], false));
      // 选择框范围内未选定的选中
      unselected.forEach(key => map.setIn([key, 'isSelected'], true));
    });

  return {
    icons,
    selected: actives
  }
}

// 图标是否在选择框内
// isInChoiceBox :: string -> immutable -> object -> object -> boolean
const isInChoiceBox = (
  key, apps,
  { width, height },
  { xMin, yMin, xMax, yMax },
) => {
  const
    check = apps.get(key),
    x = check && check.get('x'),
    y = check && check.get('y');

  return x < xMax && y < yMax
    && x + width > xMin
    && y + height > yMin
    ? true : false
}

// select box style
const choiceBoxStyle = (width, height, left, top) => (`
  position: absolute;
  left: ${ left }px;
  top: ${ top }px;
  width: ${ width }px;
  height: ${ height }px;
  color: hsla(240, 100%, 33%, .3);
  background: currentColor;
  border: 1px solid;
  box-sizing: border-box;
`);