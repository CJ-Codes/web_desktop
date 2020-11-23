/**
 *
 * @param {number} curTime
 * @param {string[][]} map
 * @param {function} set
 */
export const lyricFocus = (curTime, map, set) => {
  let i = 0;
  const size = map.length;

  while (i < size) {
    const next = map?.[++i]?.[0];

    if (!next || curTime < next) {
      set(i-1);
      break
    }
  }
}