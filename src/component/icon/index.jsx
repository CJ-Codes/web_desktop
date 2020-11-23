import React from 'react';
import { IconContainer, Figure, Figcaption } from './style';

export function AppIcon({ size, info, ...rest }) {
  return (
    <IconContainer
      draggable
      size={ size }
      xpos={ info.get('x') }
      ypos={ info.get('y') }
      className={ info.get('isSelected') ? 'checked' : '' }
      { ...rest }
    >
      <Figure size={ size }>
        <img src={ info.get('icon') } alt={ info.get('name') } />
      </Figure>
      <Figcaption size={ size }>{ info.get('name') }</Figcaption>
    </IconContainer>
  )
}