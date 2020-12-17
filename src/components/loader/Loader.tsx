import React, { FC } from 'react';

import './Loader.scss';

export const Loader: FC<{}> = () => {
  return (
    <div className={'AppLoader'}>
      <div className={'loader-1'}>
        <span />
      </div>
    </div>
  );
};
