import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FALIURE
}
    from '../action/types';

const initialState = {
    user:[],
    loading:true,
    error:''
}


const LoginReducer =(state= initialState,action) =>{
    switch (action.type){
        case 'LOGIN_REQUEST':{
            return{
                ...state,
                loading:true,
            }
        }
        case 'LOGIN_SUCCESS':{
            return{
                ...state,
                user:action.data,
                loading:false,
                error:''
            }
        }
        case 'LOGIN_SUCCESS':{
            return{
                ...state,
                user:[],
                loading:false,
                error:action.data
            }
        }
        default: return state
    }
}

export default LoginReducer