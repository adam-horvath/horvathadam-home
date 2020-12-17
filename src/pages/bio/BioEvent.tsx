import React, { FC } from 'react';

import './BioEvent.scss';

export interface YearCardProps {
  year: number | null;
}

export const BioEvent: FC<YearCardProps> = ({ year, children }) => {
  return (
    <div className={'year-card-container'}>
      {year ? <div className={'section-title mb-2'}>{year}.</div> : null}
      <div className={'year-card-text mt-2 mb-4'}>{children}</div>
    </div>
  );
};
