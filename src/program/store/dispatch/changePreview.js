import { edgeState, previewSize } from '../../../store';

// 预览图
export const changePreview = (result, { view, code }, glDisp) => {

  if (result !== void 0 && code !== 2) {
    if (result) { // { Immutable }
      glDisp(previewSize( view ))
    }

    glDisp( edgeState(!!result) )
  }
}