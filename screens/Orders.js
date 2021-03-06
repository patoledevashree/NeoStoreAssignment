import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Time from './Time';
import {baseUrl} from '../shared/config';

/**
 * @author Devashree Patole
 * @description This screen contains the list of orders the user have made
 * @param {object} route  This object contains the token of the loggedin user
 * @returns JSX of Orders list
 */
export default function Orders({route}) {
  const orderList = route.params.orderList;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView>
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
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
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
