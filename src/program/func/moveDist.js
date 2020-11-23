
export const moveDist = ([xbegin, ybegin], _move, _up) => {

  // 鼠标移动
  function mouseMove (e) {
    // 结束坐标
    const { clientX, clientY } = e;
    // 移动往 左、上为负值, 右、下为正值
    const x = clientX - xbegin, y = clientY - ybegin;

    _move({ e, x, y });
  }

  // 鼠标抬起
  function mouseUp (e) {
    _up({ e });
    // 移除事件
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);
  }

  document.addEventListener('mousemove', mouseMove);
  document.addEventListener('mouseup', mouseUp);
}
