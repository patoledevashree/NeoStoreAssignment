import  DashboardReducer from './reducer/DashboardReducer'
import { createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import LoginReducer from './reducer/LoginReducer';

const rootReducer = combineReducers({
    dashboardReducer:DashboardReducer,
    loginReducer:LoginReducer
})

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

export default store