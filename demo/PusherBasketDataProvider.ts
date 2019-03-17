import { DataProvider, BasketItem } from "../src";
import axios from 'axios';
import Pusher from 'pusher-js';

export class PusherBasketDataProvider implements DataProvider {
  pusher: Pusher;
  channel: any;
  callbacks: ((items: BasketItem[]) => void)[] = [];

  constructor() {
    this.pusher = new Pusher("5084eb82130619c14d4e", {
      cluster: 'eu',
      forceTLS: true
    });
    this.channel = this.pusher.subscribe("my-channel");

    this.channel.bind('itemAdded', this.basketChanged);
    this.channel.bind('itemUpdated', this.basketChanged);
    this.channel.bind('itemRemoved', this.basketChanged);
    this.channel.bind('cartEmptied', this.basketChanged);
  }

  registerToChanges(callback: (items: BasketItem[]) => void) {
    this.callbacks.push(callback);
  }
  
  basketChanged = (items: BasketItem[]) => {
    this.callbacks.forEach(callback => callback(items));
  }


  getInitialData = (): Promise<BasketItem[]> => {
    return new Promise<BasketItem[]>((resolve, reject) => {
      axios.get<BasketItem[]>("http://localhost:8080/cart/items", {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          resolve(response.data);
        })
        .catch(reason => {
          reject(reason);
        })
    });
  }

  onAllItemsDeleted = (): Promise<BasketItem[]> => {
    return new Promise<BasketItem[]>((resolve, reject) => {
      axios.delete("http://localhost:8080/cart", {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          resolve(response.data);
        })
        .catch(reason => {
          reject(reason);
        })
    });
  }

  onItemAdded = (id: string): Promise<BasketItem[]> => {
    return new Promise<BasketItem[]>((resolve, reject) => {
      axios.post<BasketItem[]>("http://localhost:8080/cart/item", { id }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          resolve(response.data);
        })
        .catch(reason => {
          reject(reason);
        })
    });
  }

  onItemDeleted = (id: string): Promise<BasketItem[]> => {
    return new Promise<BasketItem[]>((resolve, reject) => {
      axios.delete("http://localhost:8080/cart/item", {
        data: { id },
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          resolve(response.data);
        })
        .catch(reason => {
          reject(reason);
        })
    });
  }
}