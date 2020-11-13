import React, {useEffect, useState} from 'react';
import {View, Text, YellowBox} from 'react-native';
import axios from 'axios';
import RadioForm from 'react-native-simple-radio-button';
import LottieView from 'lottie-react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {baseUrl} from '../shared/config';

/**
 * @author Devashree Patole
 * @description This screen is to select the address for delivery of the products
 * @param {object} route This object contains the token of loggedIn user
 * @returns JSX of select Address Screen
 */
export default function SelectAddress({route}) {
  useEffect(() => {
    getAddress();
  }, []);
  const token = route.params.token;
  const [addressList, setAddress] = useState({});
  const [loading, setLoading] = useState(true);
  const [address, setAdd] = useState('');
  const navigation = useNavigation();

  const getAddress = () => {
    axios
      .get(`${baseUrl}/getCustAddress`, {
        headers: {Authorization: `bearer ${token}`},
      })
      .then((response) => {
        setAddress(response);
        setLoading(false);
      })
      .catch((error) => {
        if (
          error.response.data.message ===
          'You did not add any address. Please add atleast one address.'
        ) {
          setAddress([]);
          Toast.show(error.response.data.message);
        }
        setLoading(false);
      });
  };

  var radio_props = [];
  if (addressList?.data?.customer_address.length !== 0) {
    for (let i = 0; i < addressList?.data?.customer_address.length; i++) {
      radio_props.push({
        label: addressList.data.customer_address[i].address,
        value: addressList.data.customer_address[i],
      });
    }
  }

  const Address = (values) => {
    setAdd(values);
    axios
      .put(
        `${baseUrl}/updateAddress`,
        {
          address_id: values.address_id,
          address: values.address,
          pincode: values.pinCode,
          city: values.city,
          state: values.state,
          country: values.country,
          isDeliveryAddress: true,
        },
        {
          headers: {Authorization: `bearer ${token}`},
        },
      )
      .then((response) => {
        // console.log('response', response);
        route.params.onSelect(values);
        navigation.goBack();
      })
      .catch((error) => {
        // console.log('error', error.response);
      });
  };
  YellowBox.ignoreWarnings([
    'Non-serializable values were found in the navigation state',
  ]);
  if (loading) {
    return (
      <LottieView
        source={require('../assests/images/4383-circle-loader.json')}
        autoPlay
        loop
      />
    );
  } else {
    if (addressList.length === 0) {
      return (
        <View style={{marginVertical: 20}}>
          <FontAwesome
            name="frown-open"
            size={200}
            color={'#e7e7e7'}
            style={{
              marginHorizontal: 100,
              marginVertical: 10,
            }}
          />
          <Text
            style={{
              fontSize: 35,
              color: '#777',
              textAlign: 'center',
            }}>
            No Address Present
          </Text>
        </View>
      );
    } else {
      return (
        <View>
          <View style={{marginLeft: 20, marginTop: 30, marginRight: 30}}>
            <RadioForm
              radio_props={radio_props}
              initial={-1}
              formHorizontal={false}
              buttonColor={'#2874F0'}
              selectedButtonColor={'#2874F0'}
              onPress={(val) => {
                Address(val);
              }}
              labelStyle={{fontSize: 18, paddingRight: 10}}
            />
          </View>
        </View>
      );
    }
  }
}
