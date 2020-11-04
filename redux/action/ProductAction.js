import {
    GET_PRODUCTDETAIL_REQUEST,
    GET_PRODUCTDETAIL_SUCCESS,
    GET_PRODUCTDETAIL_FALIURE
} from '../action/types';
import axios from 'axios';

export const productDetailRequest = () => {
    return {
        type: GET_PRODUCTDETAIL_REQUEST
    }
}

export const productDetailSuccess =(detail)=>{
    return{
        type:GET_PRODUCTDETAIL_SUCCESS,
        data: detail
    }
}

export const productDetailFaliure =(error)=>{
    return{
        type:GET_PRODUCTDETAIL_FALIURE,
        data:error
    }
}

export const getProductDetail = (id)=>{
    return(dispatch)=>{
        dispatch(productDetailRequest())
        axios.get('http://180.149.241.208:3022/getProductByProdId/'+id)
        .then(response=>{
            const detail = response.data.product_details[0]
            dispatch(productDetailSuccess(detail))
        })
        .catch(error=>{
            dispatch(productDetailFaliure(error))
        })
    }

}