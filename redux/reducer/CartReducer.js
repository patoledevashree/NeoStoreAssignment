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
      return {
        ...state,
        cartData: action.data,
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

    default:
      return state;
  }
};

export default CartReducer;
