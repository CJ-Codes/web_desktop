import { iconsData } from '../../store/action';
import { mapData } from '../store/action';
import { dropSequence } from './';

// 拖拽时的光标状态
export function cursorDragState(e) {
  // 它的值 必须是 dragstart 事件中 effectAllowed 允许的值
  e.dataTransfer.dropEffect = "move";
  // console.log(e.dataTransfer)
  e.preventDefault();
}

/**
 * Drag Start
 * @param {MouseEvent} event
 * @param {Immutable} state
 * @param {Immutable} apps
 * @param {Object} size 图标大小及位置数据
 * @param {((Object) => void)} disp
 */
export function dragDrop({
  event, state, apps, size,
  disp: [disp, glDisp],
}) {
  const
    /**
     * NOTE:
     * dragend 事件在 Firefox 中除 screenX/screenY
     * 其它方式获取鼠标坐标都会得到 0
     */
    { screenX, screenY } = event,
    DT = event.dataTransfer;

  // 拖拽时允许的鼠标状态
  DT.effectAllowed = 'move';
  // NOTE: 不设置 setData Firefox 会无法拖拽
  DT.setData('text', '');

  // disp(saveDragState(e))

  // 拖拽结束
  function dragend(ev) {
    // 拖拽距离
    const dist = dragDist([screenX, screenY], ev);
    const { icons, iconsMap } = dropSequence(dist, apps, state, size);

    glDisp(iconsData(icons))
    disp(mapData(iconsMap))

    document.removeEventListener('dragend', dragend);
  }

  document.addEventListener('dragend', dragend);
}

// 鼠标移动拖拽距离
const dragDist = ([xbegin, ybegin], e) => ({
  x: e.screenX - xbegin,
  y: e.screenY - ybegin,
})

