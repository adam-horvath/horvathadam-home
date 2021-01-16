import React, { FC, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { routes } from 'routes/routes';
import './Hamburger.scss';

export interface HamburgerProps {
  openMenu: boolean;
  toggleMenu: () => void;
}

export const Hamburger: FC<HamburgerProps> = ({ openMenu, toggleMenu }) => {
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenu]);

  const menuPanelRef = useRef<HTMLDivElement>(null);
  const hamburgerIconRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: Event) => {
    if (
      menuPanelRef &&
      !menuPanelRef.current?.contains(event.target as Node) &&
      hamburgerIconRef &&
      !hamburgerIconRef.current?.contains(event.target as Node) &&
      openMenu
    ) {
      toggleMenu();
    }
  };

  const onMenuClick = () => {
    toggleMenu();
  };

  return (
    <React.Fragment>
      <div ref={hamburgerIconRef} className={classNames('hamburger-icon', { cross: openMenu })} onClick={onMenuClick}>
        <div className={classNames('bar', { bar1: openMenu })} />
        <div className={classNames('bar', { bar2: openMenu })} />
        <div className={classNames('bar', { bar3: openMenu })} />
      </div>
      <div ref={menuPanelRef} className={`hamburger-panel ${openMenu ? 'open' : 'closed'}`}>
        {routes
          .filter((r) => r.pathname !== '/logs')
          .map((route) => {
            return (
              <div className={'menu-item'}>
                <Link to={route.pathname} onClick={onMenuClick}>
                  {route.name}
                </Link>
              </div>
            );
          })}
      </div>
    </React.Fragment>
  );
};
