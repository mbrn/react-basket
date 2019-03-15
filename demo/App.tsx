import * as React from 'react';
import { BasketProvider } from '../src';

export interface AppProps {}

export default class App extends React.Component<AppProps, any> {
  render() {
    return (
      <div>       
        <BasketProvider/>
      </div>
    );
  }
}