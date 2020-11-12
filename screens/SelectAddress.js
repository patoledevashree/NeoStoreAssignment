import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';
import RadioForm from 'react-native-simple-radio-button';
import LottieView from 'lottie-react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

export default function SelectAddress({route}) {
  useEffect(() => {
    getAddress();
  }, []);
  const token = route.params.token;
  console.log('token', token);
  const [addressList, setAddress] = useState({});
  const [loading, setLoading] = useState(true);
  const [address, setAdd] = useState('');
  const navigation = useNavigation();

  const getAddress = () => {
    axios
      .get('http://180.149.241.208:3022/getCustAddress', {
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
        'http://180.149.241.208:3022/updateAddress',
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
        console.log('response', response);
        route.params.onSelect(values);
        navigation.goBack();
      })
      .catch((error) => {
        console.log('error', error.response);
      });
  };

  if (loading) {
    return (
      <LottieView
        source={require('../assests/images/4383-circle-loader.json')}
        autoPlay
        loop
      />
    );
  } else {
    console.log('addresslist', addressList);
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
          {console.log('radio', radio_props)}
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
            {console.log('val', address)}
          </View>
        </View>
      );
    }
  }
}
