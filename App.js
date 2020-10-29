import React ,{Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginStack from './navigation/LoginStack';
import RegisterStack from './navigation/RegisterStack';
import DashboardStack from './navigation/DashboardStack';
import ProductStack from './navigation/ProductStack';

const Drawer = createDrawerNavigator();

/**
 * @author Devashree Patole
 * @description This file contains the code for drawer navigation for the Login,Register ,
 *              Dashboardand Product screenPropTypes.
 * @returns JSX of the Navigation.
 */
export default class App extends Component{
  render(){
   
    return(
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name='Login' component={LoginStack} />
          <Drawer.Screen name ='Register' component={RegisterStack}/>
          <Drawer.Screen name = 'Dashboard' component={DashboardStack} />
          <Drawer.Screen name= 'Product' component ={ProductStack} />
        </Drawer.Navigator>
      </NavigationContainer>
    )
  }
}
