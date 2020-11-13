import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FALIURE,
  SIGN_OUT,
} from '../action/types';

const initialState = {
  user: [],
  loading: false,
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
    case 'LOGIN_FALIURE': {
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
