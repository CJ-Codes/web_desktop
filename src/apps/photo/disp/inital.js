import { getImages, randomColor } from '../func/';
import { visibleSize } from './';

/**
 *
 * @param {string[]} urls
 */
export const inital = (view, urls, set) => {
  getImages(urls)
    .then(imgs => {
      const pics = baseData(imgs);
      visibleSize(view, pics, set)
    })

    .catch((e) => {
      console.log(e)
    })
}

/** */
const baseData = imgs => {
  const data = [];
  // 图片默认高
  const radix = 160;

  imgs.forEach(o => {
    const pic = o.value;
    if (pic) {
      const {
        naturalWidth: w, naturalHeight: h,
      } = pic;
      const ratio = h > radix ? radix / h : 1;

      data.push({
        url: pic.src,
        size: [ratio * w, ratio * h],
        natural: [w, h],
        bgc: randomColor(),
      })
    }
  })

  return data
}