import { fromJS } from 'immutable';
import { createID } from '../../tools';

// dataInitial :: Object -> Object
export function dataInitial(data) {
  return fromJS(data.reduce((acc, cur) => {
    // 为每个图标创建一个随机 ID
    const id = `WEB2_${ createID() }`;

    // 增加默认状态
    acc[(cur.id || id)] = {
      id, ...cur,
      isSelected: false,
    }

    return acc
  }, {}))
}
