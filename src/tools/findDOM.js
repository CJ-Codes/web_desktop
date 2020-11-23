// DOM Find
export const findDOM = (target, word) => {
  while (target && !target.matches(word)) {
    target = target !== document.body
      ? target.parentNode
      : null;
  }

  return target
}