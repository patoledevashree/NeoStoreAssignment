import React, {useState} from 'react';
import {View, StyleSheet, Alert, Image} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Avatar, Title, Drawer, Caption} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {SignOut} from '../redux/action/SignOutAction';
import Toast from 'react-native-simple-toast';
import {emptyCart} from '../redux/action/CartAction';

/**
 * @author Devashree Patole
 * @description This screen is to create a custom drawer  for the screens for navigation
 * @param {*} props of all the screen to be display in drawer navigation
 * @returns JSX of custom drawer
 */
function DrawerContent({...props}) {
  const [loggedin, setlogin] = useState(true);

  const showTost = () => {
    props.SignOut(props.cartData, props.userData.data.token);
    props.emptyCart();
    props.navigation.closeDrawer();
    Toast.show('You Successfully Logged Out', Toast.LONG);
  };
  const logOut = () => {
    Alert.alert('Logout', 'Do you wnat to LogOut', [
      {
        text: 'OK',
        onPress: () => {
          showTost();
        },
      },
      {
        text: 'Cancle',
        onPress: () => {
          props.navigation.closeDrawer();
        },
      },
    ]);
  };
  if (props.userData.data) {
    return (
      <View style={{flex: 1}}>
        <DrawerContentScrollView {...props}>
          <View style={styles.drawerContent}>
            <View
              style={{
                backgroundColor: '#3d87ff',
                marginBottom: 20,
                paddingBottom: 20,
                borderBottomStartRadius: 10,
                borderBottomEndRadius: 10,
              }}>
              <View style={styles.userInfo}>
                {props.userData.data.customer_details.profile_img ? (
                  <Image
                    style={{
                      height: 100,
                      width: 100,
                      borderRadius: 50,
                    }}
                    source={{
                      uri: `http://180.149.241.208:3022/${props.userData.data.customer_details.profile_img}`,
                    }}
                  />
                ) : (
                  <Avatar.Image
                    source={require('../assests/images/avtar.png')}
                    rounded
                    size={100}
                  />
                )}
              </View>
              <View style={{paddingLeft: 40}}>
                <Title>
                  {props.userData.data?.customer_details?.first_name}{' '}
                  {props.userData.data?.customer_details?.last_name}
                </Title>
              </View>
            </View>
            <Drawer.Section>
              {/* <DrawerItemList {...props} /> */}
              <DrawerItem
                icon={({color, size}) => (
                  <FontAwesome name="home" size={size} color={color} />
                )}
                label="Dashboard"
                labelStyle={{
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
                onPress={() => {
                  props.navigation.navigate('Dashboard');
                }}
              />
            </Drawer.Section>
            <Drawer.Section>
              <DrawerItem
                icon={({color, size}) => (
                  <FontAwesome name="gift" size={size} color={color} />
                )}
                label="Products"
                labelStyle={{
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
                onPress={() => {
                  props.navigation.navigate('Product');
                }}
              />
            </Drawer.Section>

            <Drawer.Section>
              <DrawerItem
                icon={({color, size}) => (
                  <FontAwesome name="shopping-cart" size={size} color={color} />
                )}
                label="Cart"
                labelStyle={{
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
                onPress={() => {
                  props.navigation.navigate('Cart');
                }}
              />
            </Drawer.Section>

            <Drawer.Section>
              <DrawerItem
                icon={({color, size}) => (
                  <FontAwesome name="user-circle" size={size} color={color} />
                )}
                label="MyAccount"
                labelStyle={{
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
                onPress={() => {
                  props.navigation.navigate('MyAccount');
                }}
              />
            </Drawer.Section>
          </View>
        </DrawerContentScrollView>

        <Drawer.Section style={styles.bottomSection}>
          <DrawerItem
            icon={({color, size}) => (
              <FontAwesome name="sign-out-alt" size={size} color={color} />
            )}
            label="Logout"
            labelStyle={{
              fontSize: 18,
              fontWeight: 'bold',
            }}
            onPress={() => {
              logOut();
            }}
          />
        </Drawer.Section>
      </View>
    );
  } else {
    return (
      <View style={{flex: 1}}>
        <DrawerContentScrollView {...props}>
          <Drawer.Section>
            <DrawerItem
              icon={({color, size}) => (
                <FontAwesome name="sign-in-alt" size={size} color={color} />
              )}
              label="Login"
              labelStyle={{
                fontSize: 18,
                fontWeight: 'bold',
              }}
              onPress={() => {
                props.navigation.navigate('Login');
              }}
            />
          </Drawer.Section>
          <Drawer.Section>
            <DrawerItem
              icon={({color, size}) => (
                <FontAwesome name="user-edit" size={size} color={color} />
              )}
              label="Register"
              labelStyle={{
                fontSize: 18,
                fontWeight: 'bold',
              }}
              onPress={() => {
                props.navigation.navigate('Register');
              }}
            />
          </Drawer.Section>
          <Drawer.Section>
            <DrawerItem
              icon={({color, size}) => (
                <FontAwesome name="home" size={size} color={color} />
              )}
              label="Dashboard"
              labelStyle={{
                fontSize: 18,
                fontWeight: 'bold',
              }}
              onPress={() => {
                props.navigation.navigate('Dashboard');
              }}
            />
          </Drawer.Section>
          <Drawer.Section>
            <DrawerItem
              icon={({color, size}) => (
                <FontAwesome name="gift" size={size} color={color} />
              )}
              label="Products"
              labelStyle={{
                fontSize: 18,
                fontWeight: 'bold',
              }}
              onPress={() => {
                props.navigation.navigate('Product');
              }}
            />
          </Drawer.Section>
          <Drawer.Section>
            <DrawerItem
              icon={({color, size}) => (
                <FontAwesome name="shopping-cart" size={size} color={color} />
              )}
              label="Cart"
              labelStyle={{
                fontSize: 18,
                fontWeight: 'bold',
              }}
              onPress={() => {
                props.navigation.navigate('Cart');
              }}
            />
          </Drawer.Section>
        </DrawerContentScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.loginReducer.user,
    cartData: state.cartReducer.cartData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SignOut: (cartItem, token) => dispatch(SignOut(cartItem, token)),
    emptyCart: () => dispatch(emptyCart()),
  };
};

const styles = StyleSheet.create({
  bottomSection: {
    marginBottom: 15,
    fontSize: 18,
  },
  drawerContent: {
    flex: 1,
  },
  userInfo: {
    marginLeft: 70,
    paddingTop: 20,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
