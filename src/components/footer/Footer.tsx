import React, { FC } from 'react';

import './Footer.scss';

export const Footer: FC<{}> = () => {
  return (
    <div className={'footer'}>
      <div className={'content'}>Dr. Horváth Ádám {'\u00a9'} 2020.</div>
    </div>
  );
};
