
import { rename } from '../action';

// 当光标在 header 的按钮上其阻止事件传播可能错误显示光标状态
export const correctCursor = (resizename, dispatch) => {
  if (resizename) dispatch(rename(''))
}