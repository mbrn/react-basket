import * as React from 'react';
import { BasketContext } from '../';
import { BasketData } from '../basket-data';

export interface BasketProviderProps {

}
export class BasketProvider extends React.Component<BasketProviderProps, any> {

  constructor(props: BasketProviderProps) {
    super(props);

    this.state = {
      data: {
        items: [
          { name: 'Computer', price: 1722.44, quantity: 1 },
          { name: 'Phone', price: 522.14, quantity: 2 }
        ]
      } as BasketData
    }
  }

  public render() {
    return (
      <BasketContext.Provider value={this.state.data}>
        {this.props.children}
      </BasketContext.Provider>
    );
  }
}