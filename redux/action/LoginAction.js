import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FALIURE
} from './types';
import axios from 'axios';
import Toast from 'react-native-simple-toast';

export const loginRequest = () => {
    return {
        type: LOGIN_REQUEST
    }
}

export const loginSuccess = (user) => {
    return {
        type: LOGIN_SUCCESS,
        data: user
    }
}

export const loginFaliure = (error) => {
    return {
        type: LOGIN_FALIURE,
        data: error
    }
}

export const login = (data) => {
    return (dispatch) => {
        dispatch(loginRequest())
        axios.post('http://180.149.241.208:3022/login',{
            email:data.email,
            pass:data.password
        })
        .then(response=>{
            const user = response.customer_details
            console.log(response)
            dispatch(loginSuccess(user))
            Toast.show(response.message)
        })
        .catch(error=>{
            dispatch(loginFaliure(error.message))
            Toast.show(error.message)
        })
    }
}