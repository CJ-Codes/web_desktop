import { selectIcon, frameSelected, changeSelected } from '../../shared/';
import { defaultPos, dataInitial } from '../func/';
import {
  iconsData,
  usingData,
  changeAppState,
  focusAppId,
} from '../../store/';

import {
  mapData,
  activeID,
  selectedData,
} from './action';
import { evocation } from '../../aside/dispatch';

// 桌面图标数据更新
// changeIcons :: Immutable -> [Object] -> Object -> (Object => void 0) -> void 0
export const changeIcons = (icons, data, size, [disp, glDisp]) => {
  // size 为 0则数据未初始
  icons = icons.size ? icons : dataInitial(data);
  const [newIcons, iconsMap] = defaultPos(icons, size);

  glDisp( iconsData(newIcons) ); // 图标数据
  disp( mapData(iconsMap) );   // 映射地图
}

// 选中图标
export const choice = ({
  disp: [dispatch, glDispatch],
  ...args
}) => {
  const { e } = args;
  const { id, apps, selected } = selectIcon(args);

  glDispatch(iconsData(apps));
  dispatch(selectedData(selected));
  if (id) dispatch(activeID(id));

  // 阻止触发框选
  e.stopPropagation()
}

// 图标框选
export const frameSelect = args => {
  frameSelected(args, iconsData, selectedData)
}

// 全部取消选中
export const cancelSelectedAll = (isClick, apps, state, [disp, glDisp]) => {
  // 单纯的 click 没有移动鼠标等行为
  if (!isClick) return;
  // 当前选中的图标
  const selected = state.get('selected');
  // 返回全部取消选中的新 Immuable 对象
  const data = changeSelected(selected, apps);

  // 当前选中图标id列表清空
  disp(selectedData( selected.clear() ));
  // 更新图标状态
  glDisp(iconsData( data ))
}

// 启动应用
export const startApp = (event, id, glState, glDisp) => {
  // 在按住 ctrl、shift 时阻止事件冒泡并返回
  if (event.shiftKey || event.ctrlKey) {
    event.stopPropagation();
    return;
  };

  const usings = glState.get('usings');
  const appsState = glState.get('appsState');
  const opener = { appear: true };

  // 该程序是否已在运行
  const isRun = usings.includes(id);
  // 该程序是否处于后台状态/ value or undefined
  const isBS = glState.get('backstage').find(e => e.name === id);

  if (isBS) {
    evocation(isBS, glState, glDisp)
  } else {
    // 未运行
    if (!isRun) {
      opener.act = 'opener';
      glDisp(usingData(usings.push(id)));
    }

    const act = appsState.mergeIn([id], opener);
    glDisp(focusAppId(id));
    glDisp(changeAppState(act));
  }
}


