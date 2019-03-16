import * as React from 'react';
import { BasketProvider, Basket, BasketContext, BasketData } from '../src';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Badge } from '@material-ui/core';
import ShoppingCart from '@material-ui/icons/ShoppingCart';

export interface AppProps extends WithStyles<typeof styles> { }

class App extends React.Component<AppProps, any> {
  render() {
    const { classes } = this.props;

    return (
      <BasketProvider>
        <div className={classes.root}>
          <AppBar position="static" elevation={0}>
            <Toolbar>
              <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                Material-UI
              </Typography>
              <div className={classes.grow} />
              <BasketContext.Consumer>
                {(basketData:BasketData) => (
                  <IconButton color="inherit">
                    <Badge badgeContent={basketData.items.length} color="secondary">
                      <ShoppingCart />
                    </Badge>
                  </IconButton>
                )}
              </BasketContext.Consumer>

            </Toolbar>
          </AppBar>
          <div style={{ margin: 20 }}>
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
      maxWidth: 1000,
      margin: 'auto'
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