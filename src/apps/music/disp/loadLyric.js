export const loadLyric = (
  url, map, current, add
) => {
  fetch(url)
    .then(e => {
      const status = e.status
      if (e.ok && status >= 200 && status < 300) {
        return e.text()
      }
    })
    .then(v => {
      const val = format(v)
      map[current] = val;
      add({
        ...map, current, isLoading: false
      })
    })
    .catch(() => {
      console.log('请求出错')
    })
}

function toSecond(str) {
  const [m, s] = str.split(':');
  return m * 60 + Number(s)
}

const format = v => (
  v
    .replace(/^\[|\[.+\]\s*(?=\[|$)/g, '')
    .replace(/[\d:.]+(?=\])/g, toSecond)
    .split('[')
    .map(v => v.split(']'))
)
