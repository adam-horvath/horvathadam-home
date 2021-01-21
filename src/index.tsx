import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { createBrowserHistory } from 'history';
import { registerRoute } from 'workbox-routing';
import * as strategies from 'workbox-strategies';
import 'bootstrap/dist/css/bootstrap.min.css';

import * as serviceWorker from 'serviceWorker';
import i18n from 'i18n';
import App from 'app/App';
import 'styles/styles.scss';
import './index.scss';

createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback=" ">
      <I18nextProvider i18n={i18n}>
        <Router basename={'/'}>
          <App />
        </Router>
      </I18nextProvider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

const strategy = new strategies.NetworkFirst();

registerRoute(/\D*\/json\/\D+\.json/gm, strategy);
