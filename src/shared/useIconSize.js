import { useState, useEffect } from 'react';

// 计算App图标大小
export function useIconSize(width, height) {
  const
    [iconSize, setIconSize] = useState(null);

    useEffect(() => {
      const
        // 每个图标的宽约为100 计算 横向可排列图标数
        xcount = ~~(width / 100),
        size = width / xcount; // icon width

      setIconSize({ // change
        ...xlineSize(size, xcount), // x-axis
        ...ylineSize(size, height), // y-axis
      });

    }, [width, height])

  return iconSize
}


// xlineSize :: Number -> Number -> Object
const xlineSize = (size, xCount) => {
  const
    // 每个图标间的间隙占其本身比例的百分之 6
    space = 0.06 * size, // icon space size

    // 横向 margin 的总量 除以 图标总数 + 1
    // 此处计算的是左间隙, +1为一行最最后一个的右间隙
    xSpace = (xCount * space) / (xCount +1),
    width = size - space;

  return { width, xSpace, xCount }
}

// xlineSize :: Number -> Number -> Object
const ylineSize = (width, viewHwight) => {
  const
    // 在图标 宽 的基础上加图标标题高(大概值), 作为基数(最小高)
    xheight = width + 12,
    // 竖向可容图标数
    yCount = ~~(viewHwight / xheight),
    size = viewHwight / yCount,
    {
      width: height,
      xSpace: ySpace,
    } = xlineSize(size, yCount);

  return { height, ySpace, yCount }
}
