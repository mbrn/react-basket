import * as React from 'react';
import { BasketData } from '../';

const BasketContext = React.createContext<BasketData>({
  items: []
});

const withBasketData = (Wrap: any) => () => {
  return (
    <BasketContext.Consumer>
      {(basketData: BasketData) => (
        <Wrap basketData={basketData}/>
      )}
    </BasketContext.Consumer>
  )
}

export { BasketContext, withBasketData }