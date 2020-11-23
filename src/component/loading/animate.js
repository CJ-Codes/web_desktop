
export const animate = ({ current: e }, set) => {
  if (e && isExpires()) {
    enter(e, set);
    localStorage.setItem('loadingTime', new Date());
  }
}

export const isExpires = () => {
  const pre = localStorage.getItem('loadingTime');
  const day = 24*60*60*1000-1000;
  const date = new Date(pre);
  const _date = date.getFullYear() +'/'+ (date.getMonth()+1) +'/'+ date.getDate();
  const nullPoint = new Date(_date);

  return Date.now() - nullPoint.getTime() > day
}

const opt = {
  step: 0,
  total: 306,
  timer: null,
};

// animate start
const enter = (e, set) => {
  const fixed = e.querySelector('.fixed');
  const canvas = e.querySelector('canvas');
  const path = e.querySelector('svg path');

  const ctx = canvas.getContext('2d');
  // path total length
  const pathSize = path.getTotalLength();
  // start point
  const { x, y } = path.getPointAtLength(0);
  canvas.width = fixed.offsetWidth;
  canvas.height = fixed.offsetHeight;

  Object.assign(opt, {
    ctx, path, pathSize, set,
  })

  ctx.strokeStyle = 'rgb(13, 23, 64)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(x, y);

  drawLoading()
}

const drawLoading = () => {
  opt.timer = requestAnimationFrame(drawLoading);
  opt.step++;

  const {
    ctx, path, step, total, pathSize, set
  } = opt;
  const ratio = step / total;
  const point = ratio * pathSize;

  const { x, y } = path.getPointAtLength(point);
  const progress = parseInt(ratio * 100);
  const pos = [-26+x, 8+y];
  const data = { disp: true, pos, progress };

  set(data);
  ctx.lineTo(x, y);
  ctx.stroke();

  if (step >= total) {
    set({ ...data, disp: false });
    cancelAnimationFrame(opt.timer)
    document.querySelector('div[title*=demo]').click()
  }
}