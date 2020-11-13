import {
  GET_CARTDATA_REQUEST,
  GET_CARTDATA_SUCCESS,
  GET_CARTDATA_FALIURE,
  ADD_TOCART,
  REMOVE_FROM_CART,
  EMPTY_CART,
  INCREAMENT_QUANTITY,
  DECREMENT_QUANTITY,
  RESTORE_CART,
} from './types';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import {baseUrl} from '../../shared/config';

export const cartDataRequest = () => {
  return {
    type: GET_CARTDATA_REQUEST,
  };
};

export const cartDataSuccess = (cart) => {
  return {
    type: GET_CARTDATA_SUCCESS,
    data: cart,
  };
};

export const cartDataFaliure = (error) => {
  return {
    type: GET_CARTDATA_FALIURE,
    data: error,
  };
};

export const addCart = (data) => {
  return {
    type: ADD_TOCART,
    data: data,
  };
};

export const removeCart = (data) => {
  return {
    type: REMOVE_FROM_CART,
    data: data,
  };
};

export const emptyCart = () => {
  return {
    type: EMPTY_CART,
  };
};

export const incerment = (data) => {
  return {
    type: INCREAMENT_QUANTITY,
    data: data,
  };
};

export const decrement = (data) => {
  return {
    type: DECREMENT_QUANTITY,
    data: data,
  };
};

export const getCartData = (token) => {
  return (dispatch) => {
    dispatch(cartDataRequest());
    axios
      .get(`${baseUrl}/getCartData`, {
        headers: {Authorization: `bearer ${token}`},
      })
      .then((response) => {
        let cart = [];
        if (
          response.data.message ===
          'Your cart is empty. Please, first add products on your cart'
        ) {
          cart = [];
        } else {
          cart = response.data.product_details;
        }
        dispatch(cartDataSuccess(cart));
      })
      .catch((error) => {
        // console.log('error', error);
        if (error.response?.data?.message === undefined) {
          dispatch(cartDataFaliure(error.response.data));
        }
      });
  };
};

export const checkCart = (product, cartItem) => {
  return (dispatch) => {
    let index = -1;
    for (let i = 0; i < cartItem.length; i++) {
      if (product.product_id === cartItem[i].product_id.product_id) {
        Toast.show('Already Added to Cart');
        index = 1;
        break;
      }
    }
    if (index === -1) {
      addToCart(product, dispatch);
    }
  };
};

export const addToCart = (product, dispatch) => {
  const data = {
    product_id: product,
    product_cost: product.product_cost,
    quantity: 1,
    total_productCost: parseInt(product.product_cost),
  };
  dispatch(addCart(data));
  Toast.show('Item Added to cart');
};

export const removeFromCart = (item) => {
  return {
    type: REMOVE_FROM_CART,
    data: item,
  };
};

export const deleteCart = (item, token) => {
  return (dipatch) => {
    axios
      .delete(`${baseUrl}/deleteCustomerCart/${item.product_id.product_id}`, {
        headers: {Authorization: `bearer ${token}`},
      })
      .then((response) => {
        // console.log('response', response);
      })
      .catch((error) => {
        // console.log('error', error.response);
      });
  };
};

export const increamentQuantity = (item) => {
  return {
    type: INCREAMENT_QUANTITY,
    data: item,
  };
};

export const decrementQuantity = (item) => {
  return {
    type: DECREMENT_QUANTITY,
    data: item,
  };
};

export const orderProduct = (cartItem, token) => {
  return (dispatch) => {
    let cartCheckOut = [];
    let i = 0;
    for (i; i < cartItem.length; i++) {
      cartCheckOut[i] = cartItem[i].product_id;
      cartCheckOut[i].quantity = cartItem[i].quantity;
      cartCheckOut[i].total = cartItem[i].total_productCost;
    }
    cartCheckOut[i] = {flag: 'checkout'};
    axios
      .post(`${baseUrl}/addProductToCartCheckout`, cartCheckOut, {
        headers: {Authorization: `bearer ${token}`},
      })
      .then((response) => {
        dispatch(emptyCart());
      })
      .catch((error) => {
        // console.log('error', error.response);
      });
  };
};

export const restoreCart = (cart) => {
  return {
    type: RESTORE_CART,
    data: cart,
  };
};
