import { getDisplaySize } from '../func/'
/**
 *
 * @param {number[]} view 窗口可视大小
 * @param {object[]} imgs 每个对象包含图片的原始大小
 * @param {function} set 派发更新
 */
export const visibleSize = (view, imgs, set) => {
  set(getDisplaySize(view, imgs))
}