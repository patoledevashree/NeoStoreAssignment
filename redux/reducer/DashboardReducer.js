import {
    GET_CATEGORY_REQUEST,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_FALIURE,
    GET_TOPRATEDPRODUCT_REQUEST,
    GET_TOPRATEDPRODUCT_SUCCESS,
    GET_TOPRATEDPRODUCT_FALIURE
} from '../action/types';

const initialState = {
    categoryList:[],
    topRatedProduct:[],
    isLoading:true,
    error:null
}

const ProductReducer = (state = initialState, action) => {
        switch ( action.type){
            case 'GET_CATEGORY_REQUEST':{
                return{
                    ...state,
                    isLoading:true
                }
            }
            case 'GET_CATEGORY_SUCCESS':{
                return{
                    ...state,
                    isLoading:false,
                    categoryList:action.data
                }
            }
            case 'GET_CATEGORY_FALIURE':{
                return{
                    ...state,
                    isLoading:false,
                    categoryList:[],
                    error:action.data
                }
            }

            case 'GET_TOPRATEDPRODUCT_REQUEST':{
                return{
                    ...state,
                    isLoading:true
                }
            }
            case 'GET_TOPRATEDPRODUCT_SUCCESS':{
                return{
                    ...state,
                    isLoading:false,
                    topRatedProduct:action.products
                }
            }
            case 'GET_TOPRATEDPRODUCT_FALIURE':{
                return{
                    ...state,
                    isLoading:false,
                    topRatedProduct:[],
                    error:action.products
                }
            }
            default :return state
        }
}

export default ProductReducer