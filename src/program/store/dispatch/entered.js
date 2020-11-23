import { openedState } from '../action';

export const entered = (opened, publDispatch) => {
  if (!opened) {
    publDispatch(openedState(true))
  }
}