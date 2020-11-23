/**
 *
 * @param {number[]} view
 * @param {object[]} imgs
 */
export const getDisplaySize = ([w], imgs) => {
  const size = imgs.length-1;
  // 图片的间隙
  const margin = 5;
  let
    // 图片的默认比例
    radio = 1,
    // 一行的图片宽
    content = 0,
    // 一行的图片间隙
    totalMargin = margin,
    // 上两相加的和
    totalContent = 0,
    // 正在处理的当前行
    line = [];

  return imgs.map((cur, i) => {
    const [width] = cur.size;

    content += width;
    totalMargin += margin;
    totalContent = content + totalMargin;
    line.push(cur);

    // 当前行超出容器
    if (totalContent > w) {
      // 容器宽 - 当前行总间隙 / 当前行图片宽
      radio = (w - totalMargin) / content;
      // 设置图片在页面的显示大小
      setImageSize(line, radio);
      // 下一行重置
      line = [];
      content = 0;
      totalMargin = margin;
    }
    // 没超出容器 最后一行使用上一行的比例
    else if (i === size) {
      setImageSize(line, radio)
    }

    return cur
  })
}

/**
 *
 * @param {object[]} imgs
 * @param {number} radio
 */
const setImageSize = (imgs, radio) => {
  imgs.forEach(o => {
    const [w, h] = o.size;
    // 直接修改原对象
    o.width = w * radio;
    o.height = h * radio;
  })
}