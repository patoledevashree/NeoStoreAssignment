import {
  GET_CARTDATA_REQUEST,
  GET_CARTDATA_SUCCESS,
  GET_CARTDATA_FALIURE,
  ADD_TOCART,
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
    total_ProductCost: product.product_,
  };
  console.log('data', data);
  dispatch(addCart(data));
  Toast.show('Item Added to cart');
};
