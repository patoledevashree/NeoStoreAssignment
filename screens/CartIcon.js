import React from 'react';
import {View, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

/**
 * @author Devashree Patole
 * @description This is to display the cart Icon on the header of dashboard and to display the cart count
 * @param {object} props this contains the cartData from reducer
 * @returns JSX of Icon
 */
function CartIcon(props) {
  const navigation = useNavigation();
  return (
    <View>
      <View
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          zIndex: 1,
          backgroundColor: 'red',
          borderRadius: 30,
          width: 20,
          height: 20,
        }}>
        <Text style={{color: 'white', textAlign: 'center'}}>
          {props.cartData.length}
        </Text>
      </View>
      <FontAwesome.Button
        name="shopping-cart"
        size={30}
        color="white"
        backgroundColor={'#2874F0'}
        onPress={() => navigation.navigate('Cart')}></FontAwesome.Button>
    </View>
  );
}
const mapStateToProps = (state) => {
  return {
    cartData: state.cartReducer.cartData,
    userData: state.loginReducer.user,
  };
};

export default connect(mapStateToProps)(CartIcon);
