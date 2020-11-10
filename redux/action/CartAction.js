import {
  GET_CARTDATA_REQUEST,
  GET_CARTDATA_SUCCESS,
  GET_CARTDATA_FALIURE,
  ADD_TOCART,
  REMOVE_FROM_CART,
  EMPTY_CART,
  INCREAMENT_QUANTITY,
  DECREMENT_QUANTITY,
} from './types';
import axios from 'axios';
import Toast from 'react-native-simple-toast';

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
      .get('http://180.149.241.208:3022/getCartData', {
        headers: {Authorization: `bearer ${token}`},
      })
      .then((response) => {
        console.log('response', response);
        const cart = response.data.product_details;
        dispatch(cartDataSuccess(cart));
      })
      .catch((error) => {
        console.log('error', error.response);
        dispatch(cartDataFaliure(error.response.data));
      });
  };
};

export const checkCart = (product, cartItem) => {
  return (dispatch) => {
    console.log('cartItem', cartItem);
    let index = -1;
    for (let i = 0; i < cartItem.length; i++) {
      if (product.product_id === cartItem[i].product_id.product_id) {
        console.log('matched');
        Toast.show('Already Added to Cart');
        index = 1;
        break;
      }
    }
    console.log('index', index);
    if (index === -1) {
      console.log('add product');
      console.log('Product', product);
      addToCart(product, dispatch);
    }
  };
};

export const addToCart = (product, dispatch) => {
  console.log('productAction', product);
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
  console.log('action', item);
  return {
    type: REMOVE_FROM_CART,
    data: item,
  };
};

export const deleteCart = (item, token) => {
  return (dipatch) => {
    console.log('item', item);
    axios
      .delete(
        `http://180.149.241.208:3022/deleteCustomerCart/${item.product_id.product_id}`,
        {
          headers: {Authorization: `bearer ${token}`},
        },
      )
      .then((response) => {
        console.log('response', response);
      })
      .catch((error) => {
        console.log('error', error.response);
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
