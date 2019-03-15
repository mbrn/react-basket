import * as React from 'react';
import { BasketProvider } from '../src';

export interface AppProps {}

export default class App extends React.Component<AppProps, undefined> {
  render() {
    return (
      <div>       
        <BasketProvider/>
      </div>
    );
  }
}