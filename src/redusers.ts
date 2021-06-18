import { CityType } from './components/SubHeader/SubHeader';
import { setLocalStorage } from './services/localStorage';
import { ContactType, ProductType } from './typings/graphql';

type CartType = ProductType & { length: number };

export interface InitialStateType {
  cartProducts: Array<CartType>;
  token: null | string;
  address: ContactType | null;
  city: CityType | null;
}

const initialState: InitialStateType = {
  cartProducts: [],
  token: null,
  address: null,
  city: null,
};

function sliceCart(cart: CartType[], index: number) {
  return [...cart.slice(0, index), cart[index], ...cart.slice(index + 1)];
}

const reducer = (
  state = initialState,
  action: { type: string; payload: any },
) => {
  switch (action.type) {
    case 'SET_CITY':
      return {
        ...state,
        city: action.payload,
      };
    case 'SET_ADDRESS':
      return {
        ...state,
        address: action.payload,
      };
    case 'SET_PRODUCTS':
      return {
        ...state,
        cartProducts: action.payload,
      };
    case 'UPDATE_QUANITY_PRODUCT':
      const productIndex = state.cartProducts.findIndex(
        (item: any) => item.id === action.payload.productId,
      );

      if (productIndex !== -1) {
        state.cartProducts[productIndex].length = action.payload.value;
        const newCart = sliceCart(state.cartProducts, productIndex);
        setLocalStorage('products', newCart);
        return {
          ...state,
          cartProducts: newCart,
        };
      }
      return state;
    case 'ADD_PRODUCT':
      const productId = state.cartProducts.findIndex(
        (item: any) => item.id === action.payload.id,
      );
      if (productId !== -1) {
        state.cartProducts[productId].length += action.payload.length || 1;
        const newCart = sliceCart(state.cartProducts, productId);
        setLocalStorage('products', newCart);
        return {
          ...state,
          cartProducts: newCart,
        };
      }
      const newCart = [...state.cartProducts, action.payload];

      setLocalStorage('products', newCart);

      return {
        ...state,
        cartProducts: newCart,
      };
    case 'DELETE_PRODUCT':
      const cartProductsResult = state.cartProducts.filter(
        (item: any) => item.id !== action.payload,
      );
      setLocalStorage('products', cartProductsResult);
      return {
        ...state,
        cartProducts: cartProductsResult,
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
