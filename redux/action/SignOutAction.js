import {
    SIGN_OUT
} from './types';
import  AsyncStorage  from '@react-native-community/async-storage'


export const LogOut = () => {
   return{
       type:SIGN_OUT
   }
}

export const SignOut =() =>{
    return(dispatch)=>{
        dispatch(LogOut())
        removeData();
    }
}

export const removeData = async ()=>{
    await AsyncStorage.removeItem('user');
    console.log('SignOut')
}