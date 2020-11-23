import Telescopic from '../../../shared/telescopic';
import {
  changeAppState,
  updateBackstage,
} from '../../../store/';

const mother = {
  shrink () {
    return {
      enter (f) { f() },
      exit (e, f) { f() }
    }
  },

  _shrink (state, glState, set) {
    return new Telescopic(state, glState, set)
  }
}

export const buttonSwitch = (type, id, [state, glState], set) => {
  // 有全屏和非全屏两种关闭方式, 下划线开头为非全屏方式
  const act = state.get('maximize') === 1 ? type : '_'+type;

  if (mother[type]) {
    const tc = mother[act](state, glState, set);
    const bs = glState.get('backstage');
    tc.name = id;

    const action = () => set(updateBackstage(bs.push(tc)));
    tc.enter(action)
  }

  // 合并新数据
  const appState = glState.get('appsState');
  const res = appState.mergeIn([id], {
    act, appear: false,
  });

  set(changeAppState(res));
}