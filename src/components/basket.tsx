import * as React from 'react';
import { Paper, Card, CardContent, CardActions, Button, Typography } from '@material-ui/core';
import MaterialTable from 'material-table';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { withBasketData } from '../basket-context';
import { BasketData } from '../basket-data';
import { Omit } from '@material-ui/core';


export interface BasketProps {
  basketData: BasketData,
  showPaymentButton?: boolean
}

class BasketInner extends React.Component<BasketProps, any> {
  static defaultProps = {
    basketData: null,
    showPaymentButton: true
  }

  public render() {
    return (
      <Card elevation={0}>
        <CardContent style={{ padding: 0 }}>

          <MaterialTable
            components={{
              Container: (props:any) => <Paper {...props} elevation={0} />
            }}
            isLoading={this.props.basketData.isLoading}
            title="Shopping Cart"
            data={this.props.basketData.items}
            actions={[
              {
                icon: () => <DeleteOutline/>,
                tooltip: 'Delete Item(s)',
                onClick: (e:any, rowData:any) => {
                  this.props.basketData.onItemDeleted(rowData.id);
                }
              },
              {
                icon: () => <DeleteOutline/>,
                tooltip: 'Delete All Item',
                onClick: () => {
                  this.props.basketData.onAllItemsDeleted();
                },
                isFreeAction: true
              }
            ]}
            columns={[
              { title: 'Product', field: 'name' },
              { title: 'Quantity', field: 'quantity', type: 'numeric' },
              { title: 'Price', field: 'price', type: 'currency' },
            ]}
            options={{
              actionsColumnIndex: -1,
              emptyRowsWhenPaging: false,
              paging: false,
              search: false
            }}
            localization={{
              body: {
                emptyDataSourceMessage: 'No item in your shopping cart'
              },
              header: {
                actions: ''
              }
            }}
          />

          <div style={{ padding: '10px 20px 10px 10px', textAlign: 'right' }}>

          </div>
        </CardContent>
        {this.props.showPaymentButton &&
          <CardActions style={{ justifyContent: "flex-end" }}>
            <Typography variant="title" style={{ marginRight: 10 }}>
              Total: $1987.22            
              </Typography>
            <Button
              variant="outlined"
              color="primary"
              style={{ textTransform: 'none' }}                        
            >
              Payment
            </Button>
          </CardActions>
        }
      </Card>
    );
  }
}

export const Basket = withBasketData<Omit<BasketProps, "basketData">>(BasketInner);