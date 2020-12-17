import { ComponentType } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Bio } from 'pages/bio/Bio';
import { Science } from 'pages/science/Science';
import { Development } from 'pages/development/Development';
import { Tambura } from 'pages/tambura/Tambura';
import { Sauna } from 'pages/sauna/Sauna';
import { Others } from 'pages/others/Others';

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
    pathname: '/science',
    component: Science,
    name: 'Tudomány',
  },
  {
    pathname: '/development',
    component: Development,
    name: 'Fejlesztés',
  },
  {
    pathname: '/tambura',
    component: Tambura,
    name: 'Tambura',
  },
  {
    pathname: '/sauna',
    component: Sauna,
    name: 'Szauna',
  },
  {
    pathname: '/others',
    component: Others,
    name: 'Egyebek',
  },
];
