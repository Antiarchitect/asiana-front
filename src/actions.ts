import { CityType } from './components/SubHeader/SubHeader';
import { ContactType, ProductType } from './typings/graphql';

export const setToken = (token: string) => {
  return {
    type: 'SET_TOKEN',
    payload: token,
  };
};

export const setProducts = (products: ProductType[]) => {
  return {
    type: 'SET_PRODUCTS',
    payload: products,
  };
};

export const addToCartProduct = (product: ProductType) => {
  return {
    type: 'ADD_PRODUCT',
    payload: product,
  };
};

export const updateQuantity = (productId: number, value: number) => {
  return {
    type: 'UPDATE_QUANITY_PRODUCT',
    payload: {
      productId: productId,
      value: value,
    },
  };
};

export const deleteCartProduct = (productId?: number | string) => {
  return {
    type: 'DELETE_PRODUCT',
    payload: productId,
  };
};

export const setAddress = (address: ContactType) => {
  return {
    type: 'SET_ADDRESS',
    payload: address,
  };
};

export const startRequest = () => {
  return {
    type: 'START_REQUEST',
  };
};

export const stopRequest = () => {
  return {
    type: 'STOP_REQUEST',
  };
};

export const setCity = (city: CityType) => {
  return {
    type: 'SET_CITY',
    payload: city,
  };
};
