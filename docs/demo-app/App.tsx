import * as React from 'react';
import { BasketProvider, Basket, BasketContext, BasketData, DataProvider } from '../../src';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Badge } from '@material-ui/core';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import { MyBasketDataProvider } from './MyBasketDataProvider';
import { Products } from './Products';

export interface AppProps extends WithStyles<typeof styles> { }

class App extends React.Component<AppProps, any> {
  render() {
    const { classes } = this.props;

    return (
      <BasketProvider dataProvider={new MyBasketDataProvider()}>
        <div className={classes.root}>
          <AppBar position="static" elevation={0}>
            <Toolbar variant="dense">
              <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                react-basket demo
              </Typography>
              <div className={classes.grow} />
              <BasketContext.Consumer>
                {(basketData: BasketData) => (
                  <IconButton color="inherit">
                    <Badge badgeContent={basketData.items.length} color="secondary">
                      <ShoppingCart />
                    </Badge>
                  </IconButton>
                )}
              </BasketContext.Consumer>

            </Toolbar>
          </AppBar>
          <div style={{ maxWidth: 1000, margin: 'auto', marginTop: 20 }}>
            <Products />
            <div style={{ height: 25 }} />
            <Basket />
          </div>
        </div>
      </BasketProvider>
    );
  }
}

const styles = (theme: Theme) =>
  createStyles({
    root: {

    },
    grow: {
      flexGrow: 1,
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
  });


export default withStyles(styles)(App);