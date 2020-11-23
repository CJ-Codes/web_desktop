import React, { useReducer } from 'react';
import { globalState, dispAction, Provider } from './store/';
import { useWindowSize } from './tools/';
import { useIconSize } from './shared/';
import Desktop from './desktop/';
import Program from './program/';
import Aside from './aside/';
import { Preview } from './program/component/';
import { Loading } from './component/'

function App() {
  const { width, height } = useWindowSize();
  const iconSize = useIconSize(width, height);

  const [glState, glDispatch] = useReducer(dispAction, globalState);
  const apps = glState.get('data');
  const usings = glState.get('usings');
  const focus = glState.get('focus');

  return (
    <Provider store={{ glState, glDispatch }}>

      <Desktop size={ iconSize } />
      <Aside />
      <div>
      {
        usings.map(id => (
          <Program
            id={ id }
            key={ id }
            size={ iconSize }
            info={ apps.get(id) }
            view={ [width, height] }
            focusName={ focus === id ? 'focus' : '' }
          />
        ))
      }
    </div>
    <Preview />
    <Loading />
    </Provider>
  );
}

export default App;
