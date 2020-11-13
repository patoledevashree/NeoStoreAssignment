import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from '../screens/Dashboard';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Cart from '../screens/Cart';
import {View, Text} from 'react-native';
import ProductDetail from '../screens/ProductDetail';
import Product from '../screens/Product';
import {connect} from 'react-redux';
import CartIcon from '../screens/CartIcon';
import OrderSummary from '../screens/OrderSummary';
import SelectAddress from '../screens/SelectAddress';
import ThankYou from '../screens/ThankYou';

const Stack = createStackNavigator();

/**
 * @author Devashree Patole
 * @description This file provides the stack navigation of the
 *              Dashboard and Cart screens.
 * @params {object} userData  this object constins the user information
 * @returns JSX of the stack navigation
 */
function DashboardStack({userData, cartData}) {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: 'NeoStore',
          headerStyle: {
            backgroundColor: '#2874F0',
            elevation: 0,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 25,
          },
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={30}
              color="white"
              backgroundColor={'#2874F0'}
              onPress={() => navigation.openDrawer()}></Icon.Button>
          ),
          headerRight: () => <CartIcon />,
        }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          title: 'Cart',
          headerStyle: {
            backgroundColor: '#2874F0',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 25,
          },
        }}
      />
      <Stack.Screen
        name="Product"
        component={Product}
        options={{
          title: 'Product',
          headerStyle: {
            backgroundColor: '#2874F0',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 25,
          },
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={({route}) => ({
          title: route.params.product_name,
          headerStyle: {
            backgroundColor: '#2874F0',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 25,
          },
        })}
      />

      <Stack.Screen
        name="OrderSummary"
        component={OrderSummary}
        options={{
          title: 'OrderSummary',
          headerStyle: {
            backgroundColor: '#2874F0',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 25,
          },
        }}
      />

      <Stack.Screen
        name="SelectAddress"
        component={SelectAddress}
        options={{
          title: 'Select Address',
          headerStyle: {
            backgroundColor: '#2874F0',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 25,
          },
        }}
      />
      <Stack.Screen
        name="ThankYou"
        component={ThankYou}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.loginReducer.user,
    cartData: state.cartReducer.cartData,
  };
};

export default connect(mapStateToProps)(DashboardStack);
