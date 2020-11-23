import { usingData } from '../../../store/';

export const exited = (curAct, id, glState, glDispatch) => {
  if (curAct.includes('close')) {
    const us = glState.get('usings');
    glDispatch(usingData(us.splice(us.indexOf(id), 1)))
  }
}