/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import CoffeeData from '../data/CoffeeData';
//import BeansData from '../data/BeansData';
import {produce} from 'immer';

export const useStore = create(
  persist(
    set => ({
      coffeeList: null, //CoffeeData,
      beansList: null, //BeansData,
      cart: [],
      price: 0,
      orders: [],
      favList: [],
      OrderHistoryList: [],
      user: null,
      updateProductLists: (sortedProducts: {coffee: any; bean: any}) =>
        set(
          produce(state => {
            state.coffeeList = sortedProducts?.coffee || [];
            state.beansList = sortedProducts?.bean || [];
          }),
        ),
      updateUser: (userData: any) =>
        set(
          produce(state => {
            state.user = userData;
          }),
        ),
      addToCart: (cartItem: {id: any; prices: any[]}) =>
        set(
          produce(state => {
            let found = false;
            for (let i = 0; state?.cart && i < state.cart.length; i++) {
              if (state.cart[i]?.id == cartItem?.id) {
                found = true;
                let size = false;
                for (let j = 0; state.cart[i]?.prices && j < state.cart[i].prices.length; j++) {
                  if (state.cart[i]?.prices[j]?.size == cartItem?.prices?.[0]?.size) {
                    size = true;
                    state.cart[i].prices[j].quantity++;
                    break;
                  }
                }
                if (!size) {
                  state.cart[i]?.prices?.push(cartItem?.prices?.[0]);
                }
                state.cart[i]?.prices?.sort((a: {size: any}, b: {size: any}) => (b?.size || 0) - (a?.size || 0));
                break;
              }
            }
            if (!found) {
              state.cart.push(cartItem);
            }
          }),
        ),
      calcCartPrice: () =>
        set(
          produce(state => {
            let totalPrice = 0;
            for (let i = 0; state?.cart && i < state?.cart?.length; i++) {
              let tempPrice = 0;
              for (let j = 0; state?.cart[i]?.prices && j < state.cart[i].prices.length; j++) {
                tempPrice =
                  tempPrice +
                  (parseFloat(state.cart[i]?.prices[j]?.price) || 0) * (state.cart[i]?.prices[j]?.quantity || 0);
              }
              state.cart[i].ItemPrice = tempPrice.toFixed(2).toString();
              totalPrice = totalPrice + tempPrice;
            }
            state.price = totalPrice.toFixed(2).toString();
          }),
        ),
      addToFavList: (type: string, id: any) =>
        set(
          produce(state => {
            const list = type === 'Coffee' ? state?.coffeeList : state?.beansList;
            const favList = type === 'Coffee' ? state?.favList : state?.favList;

            const listItem = list?.find((item: {id: any}) => item?.id == id);

            if (listItem && typeof listItem?.favourite === 'boolean') {
              if (listItem.favourite === false) {
                listItem.favourite = true;
                favList.unshift(listItem);
              } else {
                listItem.favourite = false;
              }
            }
          }),
        ),
      deleteFromFavList: (type: string, id: any) =>
        set(
          produce(state => {
            const list = type === 'Coffee' ? state.coffeeList : state.beansList;
            const favList = type === 'Coffee' ? state.favList : state.favList;

            const listItem = list.find((item: any) => item?.id == id);

            if (listItem && typeof listItem?.favourite === 'boolean') {
              listItem.favourite = !listItem.favourite;

              const spliceIndex = favList?.findIndex((item: {id: any}) => item?.id == id);
              if (spliceIndex !== -1) {
                favList.splice(spliceIndex, 1);
              }
            }
          }),
        ),
      incrementCartItemQty: (id: string, size: string) =>
        set(
          produce(state => {
            for (let i = 0; i < state?.cart?.length; i++) {
              if (state?.cart[i]?.id == id) {
                for (let j = 0; j < state.cart[i].prices.length; j++) {
                  if (state?.cart[i].prices[j].size == size) {
                    state.cart[i].prices[j].quantity++;
                    break;
                  }
                }
              }
            }
          }),
        ),
      decrementCartItemQty: (id: string, size: string) =>
        set(
          produce(state => {
            for (let i = 0; i < state?.cart?.length; i++) {
              if (state.cart[i].id == id) {
                for (let j = 0; j < state.cart[i].prices.length; j++) {
                  if (state?.cart[i].prices[j].size == size) {
                    if (state?.cart[i].prices.length > 1) {
                      if (state?.cart[i].prices[j].quantity > 1) {
                        state.cart[i].prices[j].quantity--;
                      } else {
                        state?.cart[i]?.prices?.splice(j, 1);
                      }
                    } else {
                      if (state?.cart[i]?.prices[j]?.quantity > 1) {
                        state.cart[i].prices[j].quantity--;
                      } else {
                        state?.cart?.splice(i, 1);
                      }
                    }
                    break;
                  }
                }
              }
            }
          }),
        ),
      addToOrderHistoryListFromCart: () =>
        set(
          produce(state => {
            let temp = state?.cart?.reduce((acc: number, curr: any) => acc + parseFloat(curr.ItemPrice), 0);
            if (state.OrderHistoryList.length > 0) {
              state?.OrderHistoryList?.unshift({
                OrderDate: new Date().toDateString() + ' ' + new Date().toLocaleTimeString(),
                cart: state?.cart,
                price: temp?.toFixed(2)?.toString(),
              });
            } else {
              state?.OrderHistoryList?.push({
                OrderDate: new Date().toDateString() + ' ' + new Date().toLocaleTimeString(),
                Cart: state?.cart,
                price: temp?.toFixed(2).toString(),
              });
            }
            state.cart = [];
          }),
        ),
    }),

    {
      name: 'coffee-shop',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
