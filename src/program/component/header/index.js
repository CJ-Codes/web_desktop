import React from 'react';
import { Title, Button } from '../index';
import { HeadContain, ButtonContain } from './style';

const buttons = ['shrink', 'close'];

export default ({
  onDblClick, onMouseDown, info, ...others
}) => (
  <HeadContain
    onMouseDown={ onMouseDown }
    onDoubleClick={ onDblClick }
  >
    <Title info={ info } />
    <ButtonContain>
    {
      buttons.map(e => (
        <Button key={ e } type={ e } {...others} />
      ))
    }
    </ButtonContain>
  </HeadContain>
)
