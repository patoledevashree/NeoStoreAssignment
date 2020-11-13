import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyAccount from '../screens/MyAccount';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import ProfileEdit from '../screens/ProfileEdit';
import {useNavigation} from '@react-navigation/native';
import Orders from '../screens/Orders';
import ChangePassword from '../screens/ChangePassword';
import AddAddress from '../screens/AddAddress';
import UpdateAddress from '../screens/UpdateAddress';
import EditAddress from '../screens/EditAddress';
import OrderDetail from '../screens/OrderDetail';

/**
 * @author  Devashree Patole
 * @description This screen provides the stack navigation between the screens .The main screen is userProfile
 *  i.e MyAccount Screen and it is stack with My Orders, Update Address, Edit Profile,Change Password and
 * Add Address
 * @returns Stack navigation of Myaccount Screen
 */

const Stack = createStackNavigator();
export default function MyAccountStack() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyAccount"
        component={MyAccount}
        options={{
          title: 'MyAccount',
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
          headerRight: () => (
            <FontAwesome.Button
              name="user-edit"
              size={25}
              color="white"
              backgroundColor={'#2874F0'}
              onPress={() =>
                navigation.navigate('ProfileEdit')
              }></FontAwesome.Button>
          ),
        }}
      />

      <Stack.Screen
        name="ProfileEdit"
        component={ProfileEdit}
        options={{
          title: 'Profile Edit',
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
        name="Orders"
        component={Orders}
        options={{
          title: 'My Orders',
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
        name="ChangePassword"
        component={ChangePassword}
        options={{
          title: 'Change Password',
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
        name="AddAddress"
        component={AddAddress}
        options={{
          title: 'Add Address',
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
        name="UpdateAddress"
        component={UpdateAddress}
        options={{
          title: 'Update Address',
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
        name="EditAddress"
        component={EditAddress}
        options={{
          title: 'Edit Address',
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
        name="OrderDetail"
        component={OrderDetail}
        options={({route}) => ({
          title: route.params.order_Id,
          headerStyle: {
            backgroundColor: '#2874F0',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 25,
          },
        })}
      />
    </Stack.Navigator>
  );
}
