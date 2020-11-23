export function scrollLyric(
  { current }, [, visible], index
) {
  let ypos = 0, child;

  if (current && (child = current.firstChild)) {
    // itme height
    const h = child.offsetHeight;
    const { offsetHeight } = current;
    const midIndex = ~~((visible /2) /h);

    if (index > midIndex) {
      const max = Math.abs(offsetHeight - visible);
      const v = (index - midIndex) * h;

      ypos = -(v > max ? max : v);
    }
  }

  return ypos
}