import React from 'react';
import { TitleContain } from './style';

export default ({ info }) => (
  <TitleContain>
    <div>
      <img src={ info.get('icon') } alt="" />
    </div>
    <h3>{ info.get('name') }</h3>
  </TitleContain>
)