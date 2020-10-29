import React from 'react';
import Product from '../screens/Product';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import ProductDetailStack from './ProductDetailStack';
import ProductDetail from '../screens/ProductDetail';

const Stack = createStackNavigator();
/**
 * @author Devashree Patole
 * @description This file provides the stack navigation of the
 *              all Products and Product Detail screens.
 * @returns JSX of the stack navigation
 */
export default function ProductStack(){
    const navigation = useNavigation();
    return(
        <Stack.Navigator>
            <Stack.Screen name='Product' component={Product} 
             options={{
                title: 'Product',
                headerStyle: {
                    backgroundColor: '#2874F0',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontSize: 25
                },
                headerLeft: () => (
                    <Icon.Button name="ios-menu" size={30} color='white' backgroundColor={'#2874F0'}
                        onPress={() => navigation.openDrawer()}></Icon.Button>),
                }}/>
                <Stack.Screen name= 'ProductDetail' component={ProductDetail}
                 options={{
                    title: 'Product Detail',
                    headerStyle: {
                        backgroundColor: '#2874F0',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontSize: 25
                    },}} />
        </Stack.Navigator>
    )
}