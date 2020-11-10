import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Time from './Time';

export default function Orders({route}) {
  useEffect(() => {
    getOrders();
  }, []);
  const [orderList, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const getOrders = () => {
    axios
      .get('http://180.149.241.208:3022/getOrderDetails', {
        headers: {Authorization: `bearer ${route.params.token}`},
      })
      .then((response) => {
        console.log(response);
        setOrder(response.data.product_details);
        setLoading(false);
      })
      .catch((error) => {
        console.log('error', error.response);
        setLoading(false);
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
        {orderList.map((item, index) => {
          return (
            <View key={index} style={styles.cardWrapper}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('OrderDetail', {
                    data: item.product_details,
                    order_Id: item._id,
                  });
                }}>
                <View style={styles.card}>
                  <Text
                    style={{
                      fontSize: 18,
                      paddingTop: 20,
                      paddingLeft: 30,
                      fontFamily: 'bold',
                    }}>
                    ID: {item._id}
                  </Text>
                  <Text
                    style={{
                      color: '#eb9800',
                      fontSize: 18,
                      textAlign: 'right',
                      paddingRight: 80,
                    }}>
                    {'\u20B9'}
                    {item.product_details[0].total_cartCost}
                  </Text>
                  <Time time={item.product_details[0].createdAt} />
                  {/* <Text
                    style={{
                      fontSize: 12,
                      paddingLeft: 30,
                      paddingTop: 20,
                      paddingBottom: 20,
                    }}>
                    Ordered Date: {item.product_details[0].createdAt}
                  </Text> */}
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  cardWrapper: {
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    marginTop: 6,
    marginBottom: 20,
    shadowColor: '#777',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 5,
  },
});
