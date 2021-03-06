import {
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FALIURE,
  GET_TOPRATEDPRODUCT_REQUEST,
  GET_TOPRATEDPRODUCT_SUCCESS,
  GET_TOPRATEDPRODUCT_FALIURE,
} from './types';
import axios from 'axios';
import {baseUrl} from '../../shared/config';

export const categoryRequest = () => {
  return {
    type: GET_CATEGORY_REQUEST,
  };
};

export const categorySuccess = (detail) => {
  return {
    type: GET_CATEGORY_SUCCESS,
    data: detail,
  };
};

export const categoryFaliure = (error) => {
  return {
    type: GET_CATEGORY_FALIURE,
    data: error,
  };
};

export const topRatedProductRequest = () => {
  return {
    type: GET_TOPRATEDPRODUCT_REQUEST,
  };
};

export const topRatedProductSuccess = (products) => {
  return {
    type: GET_TOPRATEDPRODUCT_SUCCESS,
    products: products,
  };
};

export const topRatedProductFaliure = (error) => {
  return {
    type: GET_TOPRATEDPRODUCT_FALIURE,
    products: error,
  };
};

/**
 * @author Devashree Patole
 * @description This function calls the api to get list of categories of products
 * @returns List of categories
 */
export const getDashboard = () => {
  return (dispatch) => {
    dispatch(categoryRequest());
    axios
      .get(`${baseUrl}/getAllCategories`)
      .then((response) => {
        const detail = response.data.category_details;
        dispatch(categorySuccess(detail));
      })
      .catch((error) => {
        // console.log('Dashboarderror1', error.response);

        dispatch(categoryFaliure('Something went wrong'));
      });
  };
};

/**
 * @author Devashree Patole
 * @description This function call the api to get the top rated products to be displayed on
 * the dashboard of the app
 * @returns Top rated products
 */
export const getTopRatedProduct = () => {
  return (dispatch) => {
    dispatch(topRatedProductRequest());
    axios
      .get(`${baseUrl}/defaultTopRatingProduct`)
      .then((response) => {
        const products = response.data.product_details;
        dispatch(topRatedProductSuccess(products));
      })
      .catch((error) => {
        // console.log('dashboard', error.response);

        dispatch(topRatedProductFaliure('Something Went wrong'));
      });
  };
};
