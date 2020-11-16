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
import {baseUrl} from '../../shared/config';
import {Alert} from 'react-native';

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

/**
 * @author Devashree Patole
 * @description This function call the api to authenticate th euser based on email and password
 * @param {*} data It contains the email and password
 * @returns response of user
 */
export const login = (data) => {
  return (dispatch) => {
    dispatch(loginRequest());
    axios
      .post(`${baseUrl}/login`, {
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
        if (error.response.data.message === undefined) {
          Alert.alert('SomeThing Went Wrong .Please Try again later');
          dispatch(loginFaliure(error.message));
        } else {
          dispatch(loginFaliure(error.message));
          Toast.show(error.response.data.message);
        }
      });
  };
};

/**
 * @author Devashree Patole
 * @description This function restore the userdata when the usr minimizes and return back to app
 * @param {*} user It contains user data present in local storage
 * @returns dispacht the data to action to restore it
 */
export const restoreData = (user) => {
  return (dispatch) => {
    dispatch(storeData(user));
  };
};

/**
 * @author Devashree Patole
 * @description This function stores the user informatipn into the async storage
 * @param {*} user It contains the user information
 */
export const setData = async (user) => {
  await AsyncStorage.setItem('user', JSON.stringify(user));
};

/**
 * @author Devashree Patole
 * @description This function updates th e user information into the local storage
 * when the user updates its details
 * @param {*} userDetail It contains the user information
 * @returns Updated user data
 */
export const updateUser = (userDetail) => {
  return async (dispatch) => {
    let user = await AsyncStorage.getItem('user');
    let parseData = await JSON.parse(user);
    parseData.data.customer_details = userDetail;
    dispatch(updateData(parseData));
    setData(parseData);
  };
};
