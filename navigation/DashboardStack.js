import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../screens/Dashboard';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Cart from '../screens/Cart';
import ProductStack from '../navigation/ProductStack';
import {View,Text} from 'react-native'


const Stack = createStackNavigator();


/**
 * @author Devashree Patole
 * @description This file provides the stack navigation of the
 *              Dashboard and Cart screens.
 * @returns JSX of the stack navigation
 */
export default function DashboardStack() {

    const navigation = useNavigation();

    return (
        <Stack.Navigator>
            <Stack.Screen name='Dashboard' component={Dashboard}
                options={{
                    title: 'NeoStore',
                    headerStyle: {
                        backgroundColor: '#2874F0',
                        elevation: 0
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontSize: 25
                    },
                    headerLeft: () => (
                        <Icon.Button name="ios-menu" size={30} color='white' backgroundColor={'#2874F0'}
                            onPress={() => navigation.openDrawer()}></Icon.Button>),
                    headerRight: () =>(
                        <View>
                            <View style={{position:'absolute',right:0,top:0,zIndex:1,backgroundColor:'red',
                        borderRadius:30,width:20,height:20}}>
                                <Text style={{color:'white',textAlign:'center'}}>1</Text>
                            </View>
                       <FontAwesome.Button name='shopping-cart' size={30} color='white' backgroundColor={'#2874F0'}
                       onPress={()=> navigation.navigate('Cart')}></FontAwesome.Button>
                       </View>
                    )
                }} />
             <Stack.Screen name='Cart' component={Cart}
             options={{
                title: 'Cart',
                headerStyle: {
                    backgroundColor: '#2874F0',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 25
                },
            }}
             />   
             <Stack.Screen name='Product' component={ProductStack}
              options={{
                title: 'Product',
                headerStyle: {
                    backgroundColor: '#2874F0',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontSize: 25
                },}}
             />

        </Stack.Navigator>
    )
}
