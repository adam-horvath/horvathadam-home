import React, { FC, useEffect } from 'react';

import Page from 'components/page/Page';
import { withLogs } from './withLogs';
import { routes } from 'routes/routes';
import './Logs.scss';

const Logs: FC<{ logs: Array<string> }> = ({ logs }) => {
  useEffect(() => {
    console.log(logs);
  }, [logs]);

  return (
    <Page className={'bio-page'} title={'Logs'}>
      <div className={'row ml-0 mr-0'}>
        {logs.map((log) => {
          return <div className={'mb-3'}>{log}</div>;
        })}
      </div>
      <div>
        {routes.map((r) => {
          return <div>{r.pathname}</div>;
        })}
      </div>
      <div>
        {routes.map((r) => {
          return <div>{r.pathname}</div>;
        })}
      </div>
      <div>
        {routes.map((r) => {
          return <div>{r.pathname}</div>;
        })}
      </div>
      <div>
        {routes.map((r) => {
          return <div>{r.pathname}</div>;
        })}
      </div>
      <div>
        {routes.map((r) => {
          return <div>{r.pathname}</div>;
        })}
      </div>
      <div>
        {routes.map((r) => {
          return <div>{r.pathname}</div>;
        })}
      </div>
      <div>
        {routes.map((r) => {
          return <div>{r.pathname}</div>;
        })}
      </div>
      <div>
        {routes.map((r) => {
          return <div>{r.pathname}</div>;
        })}
      </div>
    </Page>
  );
};

export default withLogs()(Logs);
