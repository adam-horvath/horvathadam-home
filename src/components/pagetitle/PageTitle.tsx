import React, { FC } from 'react';
import classNames from 'classnames';

import classes from './PageTitle.module.scss';

export interface PageTitleProps {
  title: string;
}

export const PageTitle: FC<PageTitleProps> = ({ title }) => {
  return <div className={classNames(classes.PageTitleContainer)}>{title}</div>;
};
