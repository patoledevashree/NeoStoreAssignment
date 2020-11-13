import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {baseUrl} from '../shared/config';
import {cardStyles} from '../shared/Styles/cardStyle';
/**
 * @author Devashree Patole
 * @description This screen contains the oirdwr detail tob be displayed
 * @param {object} route this contain the order detail
 * @returns JSX of Order Detail Screen
 */
export default function OrderDetail({route}) {
  const orders = route.params.data;
  const totalCost = orders[0].total_cartCost;
  return (
    <View style={styles.container}>
      <View style={{marginBottom: 50}}>
        <ScrollView>
          {orders.map((item, index) => {
            return (
              <View key={index} style={cardStyles.cardWrapper}>
                <View style={cardStyles.card}>
                  <View style={cardStyles.cardImgWrapper}>
                    <Image
                      source={{
                        uri: `${baseUrl}/${item.product_details[0].product_image}`,
                      }}
                      style={cardStyles.cardImg}
                    />
                  </View>
                  <View style={cardStyles.cardInfo}>
                    <Text style={cardStyles.cardDetail}>
                      {item.product_details[0].product_name}
                    </Text>
                    <Text style={cardStyles.cardDetail}>
                      Quantity: {item.quantity}
                    </Text>
                    <Text
                      style={{
                        textAlign: 'right',
                        color: '#eb9800',
                        fontSize: 18,
                        paddingRight: 20,
                        paddingTop: 10,
                      }}>
                      {'\u20B9'} {item.total_productCost}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <Text style={styles.cost}>Total Cost</Text>
        <Text style={styles.cost}>
          {' '}
          {'\u20B9'} {totalCost}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },

  footer: {
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderTopColor: '#777',
    position: 'absolute',
    shadowColor: '#777',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    bottom: 0,
    backgroundColor: 'white',
  },
  cost: {
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 62,
  },
});
