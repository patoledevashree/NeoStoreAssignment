import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LoginStack from './navigation/LoginStack';
import RegisterStack from './navigation/RegisterStack';
import DashboardStack from './navigation/DashboardStack';
import MyAccountStack from './navigation/MyAccountStack';
import DrawerContent from './screens/DrawerContent';
import SplashScreen from 'react-native-splash-screen';

const Drawer = createDrawerNavigator();

/**
 * @author Devashree Patole
 * @description This file contains the code for drawer navigation for the Login,Register ,
 *              Dashboardand Product screenPropTypes.
 * @returns JSX of the Navigation.
 */
export default class App extends Component {
  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();
  }
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {...props} />}>
          <Drawer.Screen name="Dashboard" component={DashboardStack} />
          <Drawer.Screen name="Login" component={LoginStack} />
          <Drawer.Screen name="Register" component={RegisterStack} />
          <Drawer.Screen name="MyAccount" component={MyAccountStack} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
