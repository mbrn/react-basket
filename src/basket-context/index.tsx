import * as React from 'react';
import { BasketData, BasketItem } from '../';

const BasketContext = React.createContext<BasketData>({
  items: [],
  onItemAdded: (id: string) => {},
  onItemDeleted: (id: string) => {}
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