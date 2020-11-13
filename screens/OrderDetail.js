import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {baseUrl} from '../shared/config';
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
              <View key={index} style={styles.cardWrapper}>
                <View style={styles.card}>
                  <View style={styles.cardImgWrapper}>
                    <Image
                      source={{
                        uri: `${baseUrl}/${item.product_details[0].product_image}`,
                      }}
                      style={styles.cardImg}
                    />
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardDetail}>
                      {item.product_details[0].product_name}
                    </Text>
                    <Text style={styles.cardDetail}>
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
  cardWrapper: {
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    marginTop: 6,
    height: 150,
    marginBottom: 20,
    flexDirection: 'row',
    shadowColor: '#777',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 5,
  },
  cardImgWrapper: {
    flex: 1.3,
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 1.5,
    padding: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 1,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  cardDetail: {
    fontSize: 18,
    color: '#444',
    paddingTop: 5,
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
