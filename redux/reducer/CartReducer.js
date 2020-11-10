import {
  GET_CARTDATA_REQUEST,
  GET_CARTDATA_SUCCESS,
  GET_CARTDATA_FALIURE,
} from '../action/types';

const initialState = {
  cartData: [],
  loading: true,
  error: '',
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
        cartData: {},
        loading: false,
        error: action.data,
      };
    }

    case 'ADD_TOCART': {
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
      console.log('FilteredData', data);
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

      return {
        ...state,
        cartData: arrary,
      };
    }

    default:
      return state;
  }
};

export default CartReducer;
