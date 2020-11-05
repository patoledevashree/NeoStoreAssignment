import {
    GET_PRODUCTDETAIL_REQUEST,
    GET_PRODUCTDETAIL_SUCCESS,
    GET_PRODUCTDETAIL_FALIURE,
    GET_ALLCATEGORIES,
    GET_ALLCOLORS,
} from '../action/types';
import axios from 'axios';
import { connect } from 'react-redux';

export const productDetailRequest = () => {
    return {
        type: GET_PRODUCTDETAIL_REQUEST
    }
}

export const productDetailSuccess = (detail) => {
    return {
        type: GET_PRODUCTDETAIL_SUCCESS,
        data: detail
    }
}

export const productDetailFaliure = (error) => {
    return {
        type: GET_PRODUCTDETAIL_FALIURE,
        data: error
    }
}

export const getAllCategores = (category) => {
    return {
        type: GET_ALLCATEGORIES,
        category: category
    }
}

export const getAllColors = (colors) => {
    return {
        type: GET_ALLCOLORS,
        colors: colors
    }
}

export const getAllProducts = (products) => {
    return {
        type: GET_ALLPRODUCTS,
        productList: products
    }
}

export const getProductDetail = (id) => {
    return (dispatch) => {
        dispatch(productDetailRequest())
        axios.get('http://180.149.241.208:3022/getProductByProdId/' + id)
            .then(response => {
                const detail = response.data.product_details[0]
                dispatch(productDetailSuccess(detail))
            })
            .catch(error => {
                dispatch(productDetailFaliure(error))
            })
    }

}

export const getCategories = () => {
    return (dispatch) => {
        axios.get('http://180.149.241.208:3022/getAllCategories')
            .then(response => {
                const category = response.data.category_details
                dispatch(getAllCategores(category))
            })
            .catch(error => {
                console.log(error.response.data)
            })
    }
}

export const getColors = () => {
    return (dispatch) => {
        axios.get('http://180.149.241.208:3022/getAllColors')
            .then(response => {
                const colors = response.data.color_details
                dispatch(getAllColors(colors))
            })
            .catch(error => {
                console.log(error.response.data)
            })
    }
}

