import {
  GET_PRODUCTDETAIL_REQUEST,
  GET_PRODUCTDETAIL_SUCCESS,
  GET_PRODUCTDETAIL_FALIURE,
  GET_ALLCATEGORIES,
  GET_ALLCOLORS,
} from '../action/types';
import axios from 'axios';
import {baseUrl} from '../../shared/config';

export const productDetailRequest = () => {
  return {
    type: GET_PRODUCTDETAIL_REQUEST,
  };
};

export const productDetailSuccess = (detail) => {
  return {
    type: GET_PRODUCTDETAIL_SUCCESS,
    data: detail,
  };
};

export const productDetailFaliure = (error) => {
  return {
    type: GET_PRODUCTDETAIL_FALIURE,
    data: error,
  };
};

export const getAllCategores = (category) => {
  return {
    type: GET_ALLCATEGORIES,
    category: category,
  };
};

export const getAllColors = (colors) => {
  return {
    type: GET_ALLCOLORS,
    colors: colors,
  };
};

export const getAllProducts = (products) => {
  return {
    type: GET_ALLPRODUCTS,
    productList: products,
  };
};

/**
 * @author Devashree Patole
 * @description This function calls the api to get the product detail when the product id is passed to the api
 * @param {*} id It contians the product id
 * @returns product details
 */
export const getProductDetail = (id) => {
  return (dispatch) => {
    dispatch(productDetailRequest());
    axios
      .get(`${baseUrl}/getProductByProdId/` + id)
      .then((response) => {
        // console.log('response',response)
        const detail = response.data.product_details[0];
        dispatch(productDetailSuccess(detail));
      })
      .catch((error) => {
        // console.log('error',error.response)
        dispatch(productDetailFaliure(error));
      });
  };
};

/**
 * @author Devashree Patole
 * @description This function calls the api to get the list of categories of products
 * @returns the list of categories
 */
export const getCategories = () => {
  return (dispatch) => {
    axios
      .get(`${baseUrl}/getAllCategories`)
      .then((response) => {
        const category = response.data.category_details;
        dispatch(getAllCategores(category));
      })
      .catch((error) => {
        // console.log(error.response.data)
      });
  };
};

/**
 * @author Devashree Patole
 * @description This function is calls the api to get the list of colors
 * @returns List of colors
 */
export const getColors = () => {
  return (dispatch) => {
    axios
      .get(`${baseUrl}/getAllColors`)
      .then((response) => {
        const colors = response.data.color_details;
        dispatch(getAllColors(colors));
      })
      .catch((error) => {
        // console.log(error.response.data)
      });
  };
};
