import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Register from '../screens/Register';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import LoginStack from './LoginStack';


const Stack = createStackNavigator();


/**
 * @author Devashree Patole
 * @description This file provides the stack navigation of the
 *              Register screens.
 * @returns JSX of the stack navigation
 */
export default function RegisterStack() {

    const navigation = useNavigation();

    return (
        <Stack.Navigator>
            <Stack.Screen name='Register' component={Register}
                options={{
                    title: 'Register',
                    headerStyle: {
                        backgroundColor: '#2874F0',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        marginLeft:80,
                        fontSize: 25
                    },
                    headerLeft: () => (
                        <Icon.Button name="ios-menu" size={30} color='white' backgroundColor={'#2874F0'}
                            onPress={() => navigation.openDrawer()}></Icon.Button>)
                }} />
                 <Stack.Screen name='Login' component={LoginStack}
                options={{
                    title: 'Login',
                    headerStyle: {
                        backgroundColor: '#2874F0',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        marginLeft:80,
                        fontSize: 25
                    },
                }} />

        </Stack.Navigator>
    )
}
