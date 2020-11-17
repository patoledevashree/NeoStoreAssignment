import {storeData} from '../action/LoginAction';
import {
  GET_CARTDATA_REQUEST,
  GET_CARTDATA_SUCCESS,
  GET_CARTDATA_FALIURE,
} from '../action/types';
import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
  cartData: [],
  loading: true,
  error: '',
  order: [],
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CARTDATA_REQUEST': {
      return {
        ...state,
        loading: true,
      };
    }

    case 'GET_CARTDATA_SUCCESS': {
      const cartItem = [];
      state.cartData.map((item) => {
        const index = action.data.findIndex((product) => {
          return product.product_id.product_id === item.product_id.product_id;
        });
        if (index === -1) {
          cartItem.push(item);
        }
      });
      _RestoreData = async () => {
        await AsyncStorage.setItem(
          'cartData',
          JSON.stringify([...action.data, ...cartItem]),
        );
      };
      _RestoreData();
      return {
        ...state,
        cartData: [...action.data, ...cartItem],
        loading: false,
        error: '',
      };
    }

    case 'GET_CARTDATA_FALIURE': {
      return {
        ...state,
        cartData: [],
        loading: false,
        error: action.data,
      };
    }

    case 'ADD_TOCART': {
      _storeData = async () => {
        await AsyncStorage.setItem(
          'cartData',
          JSON.stringify([...state.cartData, action.data]),
        );
      };
      _storeData();
      return {
        ...state,
        cartData: [...state.cartData, action.data],
      };
    }

    case 'REMOVE_FROM_CART': {
      const data = state.cartData.filter(
        (product) =>
          product.product_id.product_id !== action.data.product_id.product_id,
      );

      _delstoreData = async () => {
        await AsyncStorage.setItem('cartData', JSON.stringify(data));
      };
      _delstoreData();
      return {
        ...state,
        cartData: data,
      };
    }

    case 'EMPTY_CART': {
      return {
        ...state,
        cartData: [],
      };
    }

    case 'GET_ORDER': {
      return {
        ...state,
        order: action.data,
      };
    }
    case 'INCREAMENT_QUANTITY': {
      let arrary = state.cartData.map((item) => {
        if (item.product_id.product_id === action.data.product_id.product_id) {
          let product = item;
          product.quantity = product.quantity + 1;
          product.total_productCost =
            parseInt(product.product_id.product_cost) +
            parseInt(product.total_productCost);
          return product;
        } else {
          return item;
        }
      });
      _storeData = async () => {
        await AsyncStorage.setItem('cartData', JSON.stringify(arrary));
      };
      _storeData();
      return {
        ...state,
        cartData: arrary,
      };
    }

    case 'DECREMENT_QUANTITY': {
      let arrary = state.cartData.map((item) => {
        if (item.product_id.product_id === action.data.product_id.product_id) {
          let product = item;
          product.quantity = product.quantity - 1;
          product.total_productCost =
            parseInt(product.total_productCost) -
            parseInt(product.product_id.product_cost);
          return product;
        } else {
          return item;
        }
      });
      _storeData = async () => {
        await AsyncStorage.setItem('cartData', JSON.stringify(arrary));
      };
      _storeData();
      return {
        ...state,
        cartData: arrary,
      };
    }

    case 'RESTORE_CART': {
      return {
        ...state,
        cartData: action.data,
      };
    }

    default:
      return state;
  }
};

export default CartReducer;
