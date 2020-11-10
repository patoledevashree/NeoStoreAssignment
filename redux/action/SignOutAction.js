import {SIGN_OUT} from './types';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export const LogOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const SignOut = (cartItem, token) => {
  return (dispatch) => {
    console.log('cartdata2', cartItem);
    let cartCheckOut = [];
    let i = 0;
    for (i; i < cartItem.length; i++) {
      cartCheckOut[i] = cartItem[i].product_id;
      cartCheckOut[i].quantity = cartItem[i].quantity;
      cartCheckOut[i].total = cartItem[i].total_productCost;
    }
    cartCheckOut[i] = {flag: 'logout'};
    console.log('cartCheckout', cartCheckOut);
    console.log('i', i);
    dispatch(LogOut());
    removeData();
    axios
      .post(
        'http://180.149.241.208:3022/addProductToCartCheckout',
        cartCheckOut,
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

export const removeData = async () => {
  await AsyncStorage.removeItem('user');
  console.log('SignOut');
};
