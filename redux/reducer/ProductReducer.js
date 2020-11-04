import {
    GET_PRODUCTDETAIL_REQUEST,
    GET_PRODUCTDETAIL_SUCCESS,
    GET_PRODUCTDETAIL_FALIURE
} from '../action/types';


const initialState = {
    productDetail: {},
    loading: true,
    error: ''
}

const ProductReducer = (state = initialState, action) => {
        switch (action.type){
            case 'GET_PRODUCTDETAIL_REQUEST':{
                return{
                    ...state,
                    loading:true
                }
            }

            case 'GET_PRODUCTDETAIL_SUCCESS':{
                return{
                    ...state,
                    productDetail:action.data,
                    loading:false,
                    error:''
                }
            }
            case 'GET_PRODUCTDETAIL_FALIURE':{
                return{
                    ...state,
                    loading:false,
                    productDetail:{},
                    error:action.data
                }
            }

            default : return state
        }
}

export default ProductReducer