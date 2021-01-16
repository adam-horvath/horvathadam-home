import React, { Component, ComponentClass, ComponentType } from 'react';
import { logs } from 'util/logs';

export function withLogs(): <P extends object>(WrappedComponent: ComponentType<P>) => ComponentClass<P> {
  return <P extends object>(WrappedComponent: ComponentType<P>) =>
    class WithWindowSizeComponent extends Component<P> {
      public render() {
        return <WrappedComponent logs={logs} {...this.props} />;
      }
    };
}
