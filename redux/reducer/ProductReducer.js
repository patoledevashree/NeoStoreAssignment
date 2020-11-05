import {
    GET_PRODUCTDETAIL_REQUEST,
    GET_PRODUCTDETAIL_SUCCESS,
    GET_PRODUCTDETAIL_FALIURE
} from '../action/types';


const initialState = {
    productDetail: {},
    category:{},
    colors:[],
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

            case 'GET_ALLCATEGORIES':{
                return{
                    ...state,
                    loading:false,
                    error:'',
                    category:action.category
                }
            }

            case 'GET_ALLCOLORS':{
                return{
                    ...state,
                    loading:false,
                    error:'',
                    colors:action.colors
                }
            }


            default : return state
        }
}

export default ProductReducer