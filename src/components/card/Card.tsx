import React, { FC } from 'react';
import classNames from 'classnames';

import './Card.scss';

export interface CardProps {
  className?: string;
}

export const Card: FC<CardProps> = ({ className, children }) => {
  return <div className={classNames('card', className)}>{children}</div>;
};
