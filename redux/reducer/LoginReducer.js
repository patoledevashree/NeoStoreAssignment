import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FALIURE,
  SIGN_OUT,
} from '../action/types';

const initialState = {
  user: [],
  loading: true,
  error: '',
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST': {
      return {
        ...state,
        loading: true,
      };
    }
    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        user: action.data,
        loading: false,
        error: '',
      };
    }
    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        user: [],
        loading: false,
        error: action.data,
      };
    }

    case 'STORE_DATA': {
      return {
        ...state,
        user: action.data,
        loading: false,
        error: '',
      };
    }

    case 'UPDATE_USER': {
      console.log('reducer', action.data);
      return {
        ...state,
        user: action.data,
        loading: false,
        error: '',
      };
    }

    case 'SIGN_OUT': {
      return {
        ...state,
        user: [],
        loading: false,
        error: '',
      };
    }
    default:
      return state;
  }
};

export default LoginReducer;
