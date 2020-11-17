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
  GET_ORDER,
} from './types';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import {baseUrl} from '../../shared/config';
import AsyncStorage from '@react-native-community/async-storage';

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

export const removeFromCart = (item) => {
  return {
    type: REMOVE_FROM_CART,
    data: item,
  };
};

export const emptyCart = () => {
  return {
    type: EMPTY_CART,
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

export const restoreCart = (cart) => {
  return {
    type: RESTORE_CART,
    data: cart,
  };
};

export const order = (order) => {
  return {
    type: GET_ORDER,
    data: order,
  };
};

/**
 * @author Devashree Patole
 * @description This function call the api(getCartData) to get cart item present in users account
 * @param {*} token It constains the token of logged in user
 * @returns Function retuns the array of cart item present in users account
 */
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

/**
 * @author Devashree Patole
 * @description This function check if the item that a user wants to add to cart is already present in the cart.
 * It it is present it will show the toast message of already present else it will call function(addToCart)
 * to item item in cart
 * @param {*} product It contains the product detail
 * @param {*} cartItem It contains the item present in cart
 * @returns Updated cart items
 */
export const checkCart = (product, cartItem) => {
  return (dispatch) => {
    let index = -1;
    if (cartItem?.length) {
      for (let i = 0; i < cartItem.length; i++) {
        if (product.product_id === cartItem[i].product_id.product_id) {
          Toast.show('Already Added to Cart');
          index = 1;
          break;
        }
      }
    }

    if (index === -1) {
      addToCart(product, dispatch);
    }
  };
};

/**
 * @author Devashree Patole
 * @description This function add the product into the cart into the specified format as required
 * @param {*} product It contains the product details
 * @param {*} dispatch It dispatch the action for reducer
 * @returns Updated cartItem
 */
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

/**
 * @author Devashree Patole
 * @description This function calls the api(deleteCart) to remove item from the cart
 * @param {*} item  It contains the item to be deleted
 * @param {*} token It constains the token of LoggedIn user
 * @returns Updated cart data
 */
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

/**
 * @author Devashree Patole
 * @description This function call the api(orderProduct) to place order for products in the cart
 * @param {*} cartItem It contains the cart Item
 * @param {*} token It constains the token of LoggedIn user
 * @returns It makes the cart empty
 */
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
        removeCart();
      })
      .catch((error) => {
        // console.log('error', error.response);
      });
  };
};

/**
 * @author Devashree Patole
 * @description Removes data from local storage
 */
export const removeCart = async () => {
  await AsyncStorage.removeItem('cartData');
};

export const getOrders = (token) => {
  return (dispatch) => {
    axios
      .get(`${baseUrl}/getOrderDetails`, {
        headers: {Authorization: `bearer ${token}`},
      })
      .then((response) => {
        const orders = response.data.product_details;
        dispatch(order(orders));
      })
      .catch((error) => {
        // console.log('error', error.response);
      });
  };
};
