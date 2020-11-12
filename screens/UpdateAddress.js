import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-simple-toast';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import {useFocusEffect} from '@react-navigation/native';

/**
 * @author Devashree Patole
 * @description This screen is to display list of address provided by user and also
 *              the user can edit the address and delete it
 * @returns JSX of Update address sctreen
 */
export default function UpdateAddress({route}) {
  useEffect(() => {
    getAddressList();
  }, []);

  useFocusEffect(() => {
    getAddressList();
  }, []);
  const [addressList, setAddress] = useState({});
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const getAddressList = () => {
    axios
      .get('http://180.149.241.208:3022/getCustAddress', {
        headers: {Authorization: `bearer ${route.params.token}`},
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

  const removeAddress = (id) => {
    axios
      .delete(`http://180.149.241.208:3022/deladdress/${id}`, {
        headers: {Authorization: `bearer ${route.params.token}`},
      })
      .then((response) => {
        Toast.show(response.data.message);
        getAddressList();
      })
      .catch((error) => {
        Toast.show(error.response.data.message);
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
    return (
      <View style={styles.container}>
        {addressList.length === 0 ? (
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
              No Address is available
            </Text>
          </View>
        ) : (
          <ScrollView>
            {addressList?.data?.customer_address.map((item, index) => {
              return (
                <View key={index} style={styles.cardWrapper}>
                  <View style={styles.card}>
                    <View>
                      <View style={{paddingLeft: 20, paddingTop: 30}}>
                        <Text style={{fontSize: 18}}>{item.address}</Text>
                        <Text style={{fontSize: 18, paddingTop: 5}}>
                          {item.city} - {item.pincode}
                        </Text>
                        <Text style={{fontSize: 18, paddingTop: 5}}>
                          {item.country}
                        </Text>
                        <View style={{width: 150, marginVertical: 20}}>
                          <Button
                            title="Edit"
                            onPress={() => {
                              navigation.navigate('EditAddress', {
                                data: item,
                                token: route.params.token,
                              });
                            }}
                          />
                        </View>
                      </View>
                    </View>
                    <View style={styles.icon}>
                      <TouchableOpacity
                        onPress={() => {
                          removeAddress(item.address_id);
                        }}>
                        <FontAwesome
                          name="times"
                          size={20}
                          color={'#444'}
                          style={{
                            paddingLeft: 5,
                            paddingTop: 2,
                            paddingRight: 2,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  cardWrapper: {
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    marginTop: 6,
    marginBottom: 20,
    flexDirection: 'row',
    shadowColor: '#777',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 5,
  },
  icon: {
    position: 'absolute',
    right: 15,
    top: 10,
    height: 25,
    width: 55,
    borderRadius: 50,
    backgroundColor: '#e7e7e7',
    width: 20,
  },
});
