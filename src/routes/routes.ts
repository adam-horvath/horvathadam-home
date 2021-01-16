import { ComponentType } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Bio } from 'pages/bio/Bio';
import { Science } from 'pages/science/Science';
import { Development } from 'pages/development/Development';
import { Tambura } from 'pages/tambura/Tambura';
import { Sauna } from 'pages/sauna/Sauna';
import { Others } from 'pages/others/Others';
import { Family } from 'pages/family/Family';

export interface Route {
  pathname: string;
  component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
  name: string;
}

export const routes: Route[] = [
  {
    pathname: '/',
    component: Bio,
    name: 'Életrajz',
  },
  {
    pathname: '/csalad',
    component: Family,
    name: 'Család',
  },
  {
    pathname: '/tudomany',
    component: Science,
    name: 'Tudomány',
  },
  {
    pathname: '/fejlesztes',
    component: Development,
    name: 'Fejlesztés',
  },
  {
    pathname: '/tambura',
    component: Tambura,
    name: 'Tambura',
  },
  {
    pathname: '/szauna',
    component: Sauna,
    name: 'Szauna',
  },
  {
    pathname: '/egyebek',
    component: Others,
    name: 'Egyebek',
  },
];
