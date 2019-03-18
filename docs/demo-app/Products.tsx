import * as React from 'react';
import { CircularProgress, Card, CardContent, CardHeader, CardActions, Button, Typography } from '@material-ui/core';
import { BasketItem, withBasketData, BasketData } from '../../src';

class ProductsInner extends React.Component<{ basketData: BasketData }, any> {

  constructor(props: any) {
    super(props);

    this.state = {
      isLoading: false,
      items: [
        { id: "1", name: 'Computer', price: 1722.44, quantity: 1 },
        { id: "2", name: 'Phone', price: 522.14, quantity: 2 }
      ]
    }
  }

  public render() {
    if (this.state.isLoading) {
      return (
        <div style={{ width: '100%', textAlign: 'center' }}>
          <CircularProgress />
        </div>
      );
    }

    if (this.state.error) {
      return (
        <div style={{ width: '100%' }}>
          Error: {this.state.error}
        </div>
      );
    }

    return (
      <div style={{ display: 'flex', margin: -5 }}>
        {this.state.items.map((item: BasketItem) => (
          <Card style={{ flex: 1, margin: 5 }} elevation={0}>
            <CardContent>
              <Typography variant="h6">
                {item.name}
              </Typography>
              <Typography variant="body1">
                Price ${item.price}
              </Typography>
            </CardContent>
            <CardActions style={{ justifyContent: 'flex-end' }}>
              <Button variant="outlined" color="primary" style={{ textTransform: 'none' }}
                onClick={() => {
                  this.props.basketData.onItemAdded(item.id);
                }}
              >
                Add to Basket
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    )
  }
}

export const Products = withBasketData(ProductsInner)