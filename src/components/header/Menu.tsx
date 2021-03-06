import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { routes } from 'routes/routes';
import './Menu.scss';

export interface MenuProps {
  className?: string;
}

export const Menu: FC<MenuProps> = ({ className }) => {
  const location = useLocation();
  return (
    <menu className={classNames('menu', className)}>
      {routes.map((route) => (
        <Link to={route.pathname} key={route.pathname}>
          <div className={classNames('menu-entry', { active: route.pathname === location.pathname })}>{route.name}</div>
        </Link>
      ))}
    </menu>
  );
};
