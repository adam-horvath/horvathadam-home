import React, { FC } from 'react';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { geolocated, GeolocatedProps } from 'react-geolocated';

import Header from 'components/header/Header';
import { Footer } from 'components/footer/Footer';
import { routes } from 'routes/routes';
import './App.scss';

interface AppProps extends RouteComponentProps, GeolocatedProps {}

export const App: FC<AppProps> = ({ location, coords, ...props }) => {
  return (
    <div className={'App'}>
      <Header coords={coords} />
      <div className={'w-100 main-content'}>
        <div className={'position-relative container'}>
          <TransitionGroup>
            <CSSTransition timeout={400} classNames={'fade'} key={location.key}>
              <Switch location={location}>
                {routes.map((route) => (
                  <Route exact key={route.pathname} path={route.pathname}>
                    <route.component {...props} location={location} />
                  </Route>
                ))}
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default withRouter(geolocated()(App));
