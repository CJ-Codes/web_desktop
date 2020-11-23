import { updateBackstage, changeAppState, focusAppId } from '../store/';

export const evocation = (cur, state, glDisp) => {
  const id = cur.name;
  const aside = document.querySelector('aside');
  const el = state.get('isSpread')
    ? aside.querySelector('.'+id)
    : aside;

  const as = state.get('appsState');
  const bs = state.get('backstage');

  const item = as.mergeIn([id], { appear: true });
  const i = bs.indexOf(cur);
  // 进入前台动画完成后 显示窗口
  const endAct = () => glDisp(changeAppState(item));
  glDisp(focusAppId(id));
  // 从后台列表退出
  glDisp(updateBackstage(bs.remove(i)));

  cur.exit(el, endAct);
}