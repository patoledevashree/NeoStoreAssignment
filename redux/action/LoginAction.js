import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FALIURE,
  STORE_DATA,
  UPDATE_USER,
} from './types';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    data: user,
  };
};

export const loginFaliure = (error) => {
  return {
    type: LOGIN_FALIURE,
    data: error,
  };
};
export const storeData = (user) => {
  return {
    type: STORE_DATA,
    data: user,
  };
};
export const updateData = (user) => {
  return {
    type: UPDATE_USER,
    data: user,
  };
};

export const login = (data) => {
  return (dispatch) => {
    dispatch(loginRequest());
    axios
      .post('http://180.149.241.208:3022/login', {
        email: data.email,
        pass: data.password,
      })
      .then((response) => {
        const user = response;
        dispatch(loginSuccess(user));
        Toast.show('Logged In Successfully');
        setData(user);
      })
      .catch((error) => {
        dispatch(loginFaliure(error.message));
        Toast.show('Incorrect Email or Password');
      });
  };
};

export const restoreData = (user) => {
  return (dispatch) => {
    dispatch(storeData(user));
    console.log('Restoredata');
  };
};

export const setData = async (user) => {
  console.log('setData');
  await AsyncStorage.setItem('user', JSON.stringify(user));
};

export const updateUser = (userDetail) => {
  return async (dispatch) => {
    let user = await AsyncStorage.getItem('user');
    let parseData = await JSON.parse(user);
    parseData.data.customer_details = userDetail;
    dispatch(updateData(parseData));
    setData(parseData);
  };
};
