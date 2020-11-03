import {
    GET_CATEGORY_REQUEST,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_FALIURE,
    GET_TOPRATEDPRODUCT_REQUEST,
    GET_TOPRATEDPRODUCT_SUCCESS,
    GET_TOPRATEDPRODUCT_FALIURE
} from './types';
import axios from 'axios';

export const categoryRequest = () => {
    return {
        type: GET_CATEGORY_REQUEST,
    }
}

export const categorySuccess = (detail) =>{
    return{
        type: GET_CATEGORY_SUCCESS,
        data:detail
    }
}

export const categoryFaliure = (error) =>{
    return{
        type:GET_CATEGORY_FALIURE,
        data: error
    }
}

export const topRatedProductRequest = () => {
    return {
        type: GET_TOPRATEDPRODUCT_REQUEST,
    }
}

export const topRatedProductSuccess = (products) =>{
    return{
        type: GET_TOPRATEDPRODUCT_SUCCESS,
        products:products
    }
}

export const topRatedProductFaliure = (error) =>{
    return{
        type:GET_TOPRATEDPRODUCT_FALIURE,
        products: error
    }
}

export const getDashboard = () => {
    return (dispatch) => {
        dispatch(categoryRequest())
        axios.get('http://180.149.241.208:3022/getAllCategories')
            .then(response => {
                const detail = response.data.category_details
                dispatch(categorySuccess(detail))
            })
            .catch(error => {
                dispatch(categoryFaliure(error.message))
            })
    }
}

export const getTopRatedProduct = () => {
    return (dispatch) => {
        dispatch(topRatedProductRequest())
        axios.get('http://180.149.241.208:3022/defaultTopRatingProduct')
            .then(response => {
                const products = response.data.product_details
                dispatch(topRatedProductSuccess(products))
            })
            .catch(error => {
                dispatch(topRatedProductFaliure(error.message))
            })
    }
}