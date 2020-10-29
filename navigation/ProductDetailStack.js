import React from 'react';
import ProductDetail from '../screens/ProductDetail';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

/**
 * @author Devashree Patole
 * @description This file provides the stack navigation of the
 *              ProductDetail screens.
 * @returns JSX of the stack navigation
 */
export default function ProductDetailStack(){
    const navigation = useNavigation();
    return(
        <Stack.Navigator>
            <Stack.Screen name='ProductDetail' component={ProductDetail} 
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
        </Stack.Navigator>
    )
}