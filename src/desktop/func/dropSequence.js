import { fromJS } from 'immutable';

export function dropSequence(dist, apps, state, size) {
  const
    // 选中图标移动后位置的 index
    selectedList = state.get('selected').map(key =>
      targetIndex(key, dist, apps, size)),
    // 排序后图标的index 修正
    actives = dropIndexCorrect(iconsSort(selectedList, size), size),
    // 转js数组, 后面不返回新对象直接修改该数组
    iconsMap = state.get('iconsMap').toJS(),

    icons = apps.withMutations(map => {
      actives.forEach( (cur) => { // cur -> [string, number[]]
        const [key, [x, y]] = cur;
        // 目标位置映射数据的id是否和当前id一致
        if (!Object.is(iconsMap[y][x], key)) {
          moveTarget(cur, iconsMap, size, map)
        }
      })
    })

  return { icons, iconsMap: fromJS(iconsMap) }
}

/**
 * DragDrop 处理图标移动以及去重(图标位置重复)
 * @param {[string, number[]]} cur - 当前处理的图标id值以及坐标index
 * @param {string[][]} map - 所有app图标的映射数据
 * @param {object} size - app图标的宽高留白,以及每条xy轴的容纳数量
 * @param {immutable} icons - app图标的所有数据
 * @param {boolean} reverse - 图标反向排列
 */
function moveTarget(cur, map, size, icons) {
  let current = cur, reverse = false;

  while (current) {
    const
      [ key, [x, y] ] = current,
      // 拖拽后的新位置
      [ xpos, ypos ] = toPosition([x, y], size),
      // 拖拽前的 index
      former = toIndex(icons.get(key), size), // [x, y]
      // 向下取整
      xf = ~~former[0], yf = ~~former[1],
      // 映射数据的目标位置是否有ID值
      // 若返回id, 则该位置有其它图标
      targetPos = map[y][x];

    // 拖拽前映射数据位置的 ID 是否为当前的 Key
    // 拖拽前该App映射位置的id置空
    if (Object.is(map[yf][xf], key)) map[yf][xf] = null;
    // 设置拖拽后的映射位置为当前id
    map[y][x] = key;
    // 将移动图标的新位置数据合并覆盖
    icons.mergeIn([key], { x: xpos, y: ypos });

    ({ current, reverse } = moveNext(targetPos, [x, y], size, reverse))
  }
}

// moveNext :: string -> number[] -> object -> boolean -> object
function moveNext(key, [x, y], size, reverse) {
  // 处于右下角 图标反向向上排序
  reverse = reverse || isLowerRight([x, y], size);
  const
    // 原位置上移或下移 1位
    dir = reverse ? y -1 : y +1,
    current = key && [key, indexCorrect([x, dir], size, reverse)];

  return { reverse, current }
}

// 拖拽鼠标松开后对视图外的图标位置修正
const dropIndexCorrect = (actives, { xCount, yCount }) => (
  actives.map(([key, [ x, y ]]) => (
    [
      key, [
      dropIndexLimit(x, xCount -1),
      dropIndexLimit(y, yCount -1),
    ]]
  ))
);

// 对拖放图标的 index进行范围限制
// dropIndexLimit :: number -> number -> number
const dropIndexLimit = (val, max) => (val < 0 ? 0 : val > max ? max : val);

// 是否处于右下角
// isLowerRight :: number[] -> object -> boolean
const isLowerRight = ([x, y], { xCount, yCount }) => (
  x >= xCount-1 && y >= yCount-1
);

// 将选定将要拖拽的映射数据排序
// iconsSort :: immutable -> immutable
const iconsSort = (actives) => (
  actives.sort((a, b) => {
    const [ax, ay] = a[1], [bx, by] = b[1];

    // 默认x轴从大到小, y轴从大到小
    return bx > ax ? 1 : (ax === bx ? by - ay : -1)
  }));


// index 位置修正, 范围限制
// indexCorrect :: number[] -> object -> boolean -> number[]
const indexCorrect = ([ x, y ], { xCount, yCount }, reverse) => {
  // length -1
  const xmax = xCount-1, ymax = yCount-1;

  y = reverse
    // y 小于0, 则x-1 y等于其最大值
    ? y < 0 ? (--x, ymax) : y
    // y 大于其最大值, 则x+1 y等于0
    : y > ymax ? (++x, 0) : y

  // TODO: 小于0未做处理
  x = x > xmax ? xmax : x;

  return [ x, y ]
}

// 目标位置 index 转为像素位置
// toPosition :: number[] -> Object -> number[]
const toPosition = ([x, y], size) => {
  const
    width = size.width + size.xSpace,
    height = size.height + size.ySpace;

  return [
    size.xSpace + x * width,
    size.ySpace + y * height
  ]
}

// 目标移动后的索引
// targetIndex :: string -> number -> immutable -> object -> [string, number[]]
const targetIndex = (key, dist, icons, size) => {
  const [ x, y ] = toIndex(icons.get(key), size, dist);

  return [key, [Math.round(x), Math.round(y)]]
}

// toIndex :: Immutable -> Object -> object -> number[]
const toIndex = (cur, size, { x, y }={ x:0, y:0 }) => ([
  (cur.get('x') + x) / (size.width + size.xSpace), // x
  (cur.get('y') + y) / (size.height + size.ySpace), // y
]);
