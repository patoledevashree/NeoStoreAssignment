import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Avatar, Title} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import {baseUrl} from '../shared/config';
import Somethingwrong from './Somethingwrong';

/**
 * @author Devashree Patole
 * @description This screen is to display user profile.It contains the profile image, phone no,
 *              email-id,it also contains the stack navigation of orders ,change Password,
 *              edit profile,add address and update address
 * @param {object} props this objecvt conatins the user details
 * @returns JSX of Myaccount screen
 */
function MyAccount(props) {
  const navigation = useNavigation();
  const [loading, setloading] = useState(false);

  if (props.error) {
    return <Somethingwrong />;
  }
  if (loading) {
    return (
      <LottieView
        source={require('../assests/images/4383-circle-loader.json')}
        autoPlay
        loop
      />
    );
  } else {
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          {props.userData?.data?.customer_details.profile_img ? (
            <Image
              style={{
                height: 100,
                width: 100,
                borderRadius: 50,
                marginTop: 15,
                marginLeft: 10,
              }}
              source={{
                uri: `${baseUrl}/${props.userData?.data?.customer_details.profile_img}`,
              }}
            />
          ) : (
            <Avatar.Image
              source={require('../assests/images/avtar.png')}
              size={100}
              rounded
              style={{marginTop: 30, marginLeft: 30}}
            />
          )}
          <View style={{marginLeft: 30, marginTop: 60}}>
            <Title style={{fontSize: 22}}>
              {props.userData?.data?.customer_details.first_name}{' '}
              {props.userData?.data?.customer_details.last_name}
            </Title>
          </View>
        </View>

        <View>
          <View style={{marginLeft: 30, marginTop: 20, flexDirection: 'row'}}>
            <FontAwesome name="phone-alt" size={20} color={'black'} />
            <Text style={{fontSize: 18, marginLeft: 20}}>
              {props.userData?.data?.customer_details.phone_no}
            </Text>
          </View>
          <View style={{marginLeft: 30, marginTop: 10, flexDirection: 'row'}}>
            <FontAwesome name="envelope" size={20} />
            <Text style={{fontSize: 18, marginLeft: 20}}>
              {props.userData?.data?.customer_details.email}
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', marginTop: 20}}>
          <View
            style={{
              borderTopWidth: 1,
              borderRightWidth: 1,
            }}>
            <View style={styles.content}>
              <Text style={styles.contentText}>{'\u20B9'} 0</Text>
              <Text style={styles.contentText}> Wallet</Text>
            </View>
          </View>
          <View
            style={{
              borderTopWidth: 1,
            }}>
            <View style={styles.content}>
              <Text style={styles.contentText}>
                {' '}
                {props.userData?.data?.orders_shipped +
                  props.userData?.data?.orders_onTheWay}
              </Text>
              <Text style={styles.contentText}>Orders</Text>
            </View>
          </View>
        </View>

        <View style={{borderTopWidth: 1}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Orders', {token: props.userData.data.token});
            }}>
            <View style={styles.action}>
              <View style={styles.icon}>
                <FontAwesome
                  name="first-order"
                  size={35}
                  color={'white'}
                  style={{paddingLeft: 10, paddingTop: 5}}
                />
              </View>
              <View style={{marginLeft: 40, marginTop: 10}}>
                <Text style={{fontSize: 20}}>My orders</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{borderTopWidth: 1}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ChangePassword', {
                token: props.userData.data.token,
              });
            }}>
            <View style={styles.action}>
              <View style={styles.icon}>
                <FontAwesome
                  name="lock"
                  size={25}
                  color={'white'}
                  style={{paddingTop: 10, paddingLeft: 15}}
                />
              </View>
              <View style={{marginLeft: 40, marginTop: 10}}>
                <Text style={{fontSize: 20}}>Change Password</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{borderTopWidth: 1}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AddAddress', {
                token: props.userData.data.token,
              });
            }}>
            <View style={styles.action}>
              <View style={styles.icon}>
                <FontAwesome
                  name="address-card"
                  size={25}
                  color={'white'}
                  style={{paddingLeft: 10, paddingTop: 10}}
                />
              </View>
              <View style={{marginLeft: 40, marginTop: 10}}>
                <Text style={{fontSize: 20}}>Add Address</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{borderTopWidth: 1}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('UpdateAddress', {
                token: props.userData.data.token,
              });
            }}>
            <View style={styles.action}>
              <View style={styles.icon}>
                <FontAwesome
                  name="address-card"
                  size={25}
                  color={'white'}
                  style={{paddingLeft: 10, paddingTop: 10}}
                />
              </View>
              <View style={{marginLeft: 40, marginTop: 10}}>
                <Text style={{fontSize: 20}}>Update Address</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.loginReducer.user,
    error: state.dashboardReducer.error,
  };
};

const styles = StyleSheet.create({
  content: {
    marginVertical: 15,
    marginHorizontal: 80,
  },
  contentText: {
    fontSize: 18,
  },
  action: {
    marginVertical: 10,
    flexDirection: 'row',
  },
  icon: {
    height: 50,
    width: 50,
    borderRadius: 30,
    backgroundColor: '#2874F0',
    marginLeft: 20,
  },
});

export default connect(mapStateToProps)(MyAccount);
