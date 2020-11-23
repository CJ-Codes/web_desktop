class Base {
  // inital
  constructor (state, glState) {
    const cover = this.cover = document.createElement('div');
    const canvas = this.canvas = document.createElement('canvas');
    this.ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const css = `
      width: 100vw; height: 100vh; position: absolute; top:0; left:0;
    `;
    canvas.style.cssText = `${css}z-index: 1;`;
    cover.style.cssText = `${css}z-index: 999;`;

    // 窗口视图位置大小数据
    const current = state.get('change').toJS();
    // 整体视图数据
    this.data = Base.getViewData(current, glState);
  }

  // 目标点数据
  static getViewData(cur, glState) {
    // 目标位置是否为展开状态
    const isSpread = glState.get('isSpread');
    // 处于挂起状态窗口的总数
    const count = glState.get('backstage').size;
    // 获取目标元素 默认未展开状态
    let target = document.querySelector('aside');
    // 展开状态
    if (isSpread) {
      target = target.querySelector('.context');
    }

    // 目标点大小位置
    const endData = target.getBoundingClientRect();
    // 数据修正
    return Base.viewData(
      cur, endData, count, isSpread
    )
  }

  // 数据
  static viewData(
    { width, height, left: l, top: t },
    tg, count, isSpread,
  ) {
    const w = l + width, h = t + height;
    // 轴向, 1 从左往右收缩, 反之则由上向下收缩
    const axis = isSpread || t + height /2 > tg.top;
    const order = axis ? [0, 3] : [1, 4];

    // 绘制的顺序步骤
    const step = Base.drawStep(...order);
    // 第一个角点, 也是固定点、左上角
    const first = [l, t];
    // 从右上角开始回到左上角的各个点
    const node = [
      [w, t], [w, h], [l, h], first
    ];
    // 目标点
    const target = Base.getTargetPoint(
      tg, axis, count, isSpread
    );

    return { first, node, step, target, axis }
  }

  static getTargetPoint(
    { width: w, height: h, left: x, top: y },
    axis, count, isSpread
  ) {
    // isSpread 为 true时 count至少为 1
    return axis
      ? [x+w/2, isSpread ? y+(h-count*w) : y+w, w]
      : [x, y+h/2, w]
  }

  /**
   * 绘制的步骤
   * @param {number} index 开始位置 默认值 0
   * @param {number} len 次数 默认值 0
   */
  static drawStep(index=0, len=0) {
    const store = ["bezierCurveTo", "lineTo"];
    const order = [];

    for (let i=0; i<len; i++) {
      index %= 2;
      order.push(store[index]);
      index++;
    }

    return order
  }
}

class Telescopic extends Base {
  //动画开始时间
  #startTime;
  // default enter
  #mode = true;
  #animates;
  // 每个动画的时间
  #times = {
    draw: 1000,
    clear: 600
  }

  /**
   * 活动点到目标点运动计算
   * @param {number[]} value 当前点
   * @param {number[]} target 目标点
   * @param {number} size 目标点大小
   * @param {number} t 运动开始时间
   * @param {number} d 运动最终时间
   * @param {number} x 轴向
   * @returns {number}
   */
  static activePoint (
    value, target, size, t, d, x,
  ) {

    // 此时与前面相反, axis为 true是x轴运动但要取y轴的值
    // const x = axis ? 1 : 0;
    const b = value[x];
    const c = target[x] +size - b;

    return Telescopic.linear(t, b, c, d);
  }

  // 贝赛尔曲线
  static bezierCurve (cur, pre, pos, axis) {
    const x = axis ? 0 : 1;
    // 坐标 + 半径
    const r = pos[x] + Math.abs(cur[x] - pre[x]) /2;

    return axis ? [r, pre[1], r, cur[1]] : [pre[0], r, cur[0], r]
  }

  static linear (t, b, c, d) {
    return c * t / d + b
  }

  constructor (state, glState) {
    super(state, glState);
    this.animate = this.animate.bind(this);
  }

  draw (t, d) {
    const {
      target, first, step, axis, node,
    } = this.data;
    const ctx = this.ctx;
    // 两轴比主轴速度快百分之20
    const other = 0.80 * d;

    if (t > d) { t = d };

    // 活跃点
    let active = 0;
    // 运动轴向
    let ref = null;
    // 上一个点
    let pre = first;

    ctx.fillStyle = 'hsla(0, 0%, 0%, .6)';
    // 绘制前先清除
    ctx.clearRect(
      0, 0, window.innerWidth, window.innerHeight
    );

    // 开始绘制
    ctx.beginPath()
    ctx.moveTo(...first);
    step.forEach((v, i) => {
      let value = [...node[i]], cp=[];
      const isCurve = v.includes('Curve');
      // 只有2个活动点, 首个活动点必定为 bezierCurveTo
      const isActive = (active && active < 2) || (!active && isCurve);

      if (isActive) {
        // axis 为 true则是 x轴, 反之则 y
        let x = axis ? 0 : 1;
        let size = 0;

        // 主轴只执行一次
        if (!ref) {
          ref = Telescopic.activePoint(
            value, target, size, t, d, x,
          );
        }

        value[x] = ref;

        // 反数, 上面如果取的是0为x轴, 这里反为1为y轴
        x = Math.abs(~-x);
        // 在第一个曲线时其目标点要加上大小
        if (isCurve) {
          size = axis ? -target[2] : target[2]
        }

        value[x] = Telescopic.activePoint(
          value, target, size, t>other?other:t, other, x,
        );

        // 出现第1个活跃点后开始每次自增
        ++active;
      }

      // 为曲线点
      if (isCurve) {
        // 仅返回4个控制点
        cp = Telescopic.bezierCurve(
          value, pre, first, axis,
        );
      }

      // 每次最后记录当前点, 为下次曲线引用
      pre = value;
      ctx[v](...cp, ...value);
    })

    ctx.fill()
  }

  // 变形
  animate () {
    this.timer = requestAnimationFrame(this.animate);
    // 第步动画的时间
    const times = this.#times;
    // 动画顺序
    const animates = this.#animates;
    const name = animates[0];
    // 当前帧
    let t = Date.now() - this.#startTime;
    const d = times[name] || 500;
    if (!this.#mode) { t = d - t }

    this[name](t, d);

    if (t > d || t < 0) {

      // 时间重置
      this.#startTime = Date.now();
      // 从动画列表删除已完成的
      animates.shift();
      const mode = this.#mode;

      // 动画列表为 0
      if (!animates.length) {
        cancelAnimationFrame(this.timer);
        document.body.removeChild(this.canvas);
        document.body.removeChild(this.cover);

        // 退出模式
        if (!mode) {
          this.glDisp()
        }
      }

      // 进入模式 动画第二阶段
      else if (mode) {
        this.glDisp()
      }
    }
  }

  clear (t, d) {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const {
      first: [bx, by], target: [tx, ty], axis
    } = this.data;
    const x = axis ? 0 : 1;
    const b = [bx, by];
    const c = [tx, ty];

    const v = Telescopic.linear(t, b[x], c[x], d);
    const other = axis ? [v, h] : [w, v];

    this.draw(d, d);
    this.ctx.clearRect(0, 0, ...other)
  }

  enter (glDisp, step) {
    document.body.appendChild(this.canvas);
    document.body.appendChild(this.cover);

    this.glDisp = glDisp;
    this.#startTime = Date.now();
    this.#animates = step || ['draw', 'clear']
    this.animate()
  }

  exit (el, glDisp) {
    const {
      width, height, left, top
    } = el.getBoundingClientRect();
    const data = this.data;

    data.axis = true;
    data.step = Base.drawStep(0, 3);
    data.target = [left + width/2, top+height, height];

    this.#mode = false;
    this.enter(glDisp, ['clear', 'draw'])
  }
}

export default Telescopic