import { fromJS } from 'immutable';

// 图标默认坐标及映射地图
// defaultPos :: Immutable -> Object -> [Immutable]
export function defaultPos(icons, {
  width,
  height,
  xSpace,
  ySpace,
  yCount,
}) {
  let
    xx = 0, yy = 0,
    // 横向排列数
    ycount = Math.ceil(icons.size / yCount),

    // 最后一列是否已完成
    lastDone = false;

  const
    iconsMap = createMap(yCount),
    // 竖向最后一排数量
    lastRow = icons.size % yCount,
    _width = width + xSpace,
    _height = height + ySpace,

    newIcons = icons.map( (e, k) => {
      const
        x = xx * _width + xSpace,
        y = yy * _height + ySpace;

      // 将当前图标 ID放入映射地图对应位置
      iconsMap[yy].push(k);
      // console.log(xx, yy, ycount, lastRow)

      // 每次横向图标数 +1
      xx ++;
      xx %= ycount;
      // 横向回到 0 时竖向 +1
      !xx && yy ++;
      // 相等时最后一排完成
      if (!lastDone && yy === lastRow) {
        -- ycount;
        lastDone = true;
      }

      return e.merge({ x, y }) // 坐标位置并入
    });

  return [newIcons, fromJS(iconsMap)]
}

// 创建一个包含 n个(竖向图标数)二维数组的数组
// 每一个二维数组代表一行横向图标
// createMap :: Number -> [Array]
const createMap = (yCount) => (Array.from(Array(yCount), () => []))
