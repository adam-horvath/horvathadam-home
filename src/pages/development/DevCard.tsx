import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';

import { Card } from 'components/card/Card';
import './DevCard.scss';

export interface DevCardProps {
  title: string;
  icon: ReactNode;
  className?: string;
}

export const DevCard: FC<DevCardProps> = ({ title, icon, className }) => {
  return (
    <Card className={classNames('dev-card', className)}>
      <div className={'icon-container'}>{icon}</div>
      <div className={'card-title'}>{title}</div>
    </Card>
  );
};
