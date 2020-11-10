import DashboardReducer from './reducer/DashboardReducer';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import LoginReducer from './reducer/LoginReducer';
import ProductReducer from './reducer/ProductReducer';
import CartReducer from './reducer/CartReducer';

const rootReducer = combineReducers({
  dashboardReducer: DashboardReducer,
  loginReducer: LoginReducer,
  productReducer: ProductReducer,
  cartReducer: CartReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
