import {SIGN_OUT} from './types';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {baseUrl} from '../../shared/config';

export const LogOut = () => {
  return {
    type: SIGN_OUT,
  };
};

/**
 * @author Devashree Patole
 * @description This function is called to logout from the app and also calls the api to add
 *  items in cart to database
 * @param {*} cartItem
 * @param {*} token
 * @returns disptach action to delete data in local storsge
 */
export const SignOut = (cartItem, token) => {
  return (dispatch) => {
    let cartCheckOut = [];
    let i = 0;
    for (i; i < cartItem.length; i++) {
      cartCheckOut[i] = cartItem[i].product_id;
      cartCheckOut[i].quantity = cartItem[i].quantity;
      cartCheckOut[i].total = cartItem[i].total_productCost;
    }
    cartCheckOut[i] = {flag: 'logout'};
    dispatch(LogOut());
    removeData();
    axios
      .post(`${baseUrl}/addProductToCartCheckout`, cartCheckOut, {
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
 * @description Removes data from local storage
 */
export const removeData = async () => {
  await AsyncStorage.removeItem('user');
};
