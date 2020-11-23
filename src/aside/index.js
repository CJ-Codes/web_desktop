import React, { useContext } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Container } from './style';
import { ScrollContext } from "../component/scrollContext/";
import { evocation } from './dispatch';

import {
  GlContext, switchSpread,
} from '../store/';

const AnimateStep = ([node, done]) => {
  node.addEventListener('transitionend', done, false)
}

export default () => {
  const { glState, glDispatch } = useContext(GlContext);
  const data = glState.get('data');
  const isSpread = glState.get('isSpread');
  const bs = glState.get('backstage');
  const size = bs.size;

  return (
    <Container
      className={
        (isSpread? 'spread' : '') + (size? ' show' : '')
      }
    >
      <div
        className="switched"
        onClick={ () => glDispatch(switchSpread(!isSpread)) }
      >
        <div className="ident"></div>
      </div>
      <div className="context">
        <ScrollContext>
        <TransitionGroup>
        {
        bs.map(v => {
          const id = v.name;

          return(
            <CSSTransition
              key={ id }
              classNames="disp"
              addEndListener={ (...args) => AnimateStep(args) }
              onExited={ () => {
                if(size === 1) glDispatch(switchSpread(false))
              }}
            >
              <div
                className={ id }
                onClick={ () => evocation(v, glState, glDispatch) }
              >
                <div className="iconTier">
                  <img src={ data.getIn([id, 'icon']) } alt={ id } />
                </div>
              </div>
            </CSSTransition>
          )}
        )}
        </TransitionGroup>
        </ScrollContext>
      </div>
    </Container>
  )
}