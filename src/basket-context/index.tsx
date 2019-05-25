import * as React from 'react';
import { BasketData, BasketItem } from '../';

const BasketContext = React.createContext<BasketData>({
  items: [],
  onAllItemsDeleted: () => {},
  onItemAdded: (id: string) => {},
  onItemDeleted: (id: string) => {}
});

const withBasketData =  <T extends {}>(Wrap: any) => (props: T) => {
  return (
    <BasketContext.Consumer>
      {(basketData: BasketData) => (
        <Wrap basketData={basketData} {...props}/>
      )}
    </BasketContext.Consumer>
  )
}

export { BasketContext, withBasketData }