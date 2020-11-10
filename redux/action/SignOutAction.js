import {SIGN_OUT} from './types';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export const LogOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const SignOut = (cartData, token) => {
  return (dispatch) => {
    dispatch(LogOut());
    removeData();
    axios
      .post('http://180.149.241.208:3022/addProductToCartLogout', cartData, {
        headers: {Authorization: `bearer ${token}`},
      })
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
