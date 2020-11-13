import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {
  increamentQuantity,
  removeFromCart,
  decrementQuantity,
} from '../redux/action/CartAction';
import {deleteCart} from '../redux/action/CartAction';
import {useNavigation} from '@react-navigation/native';
import {baseUrl} from '../shared/config';
import Somethingwrong from './Somethingwrong';

/**
 * @author Devashree Patole
 * @description This screen contains the lIst of products which are present in cart
 *              and also the total amout of the products.There ius also a button to place order
 *              and to remove products from cart
 * @param {object} props this constins the cartData from the reducer
 * @returns JSX of cart Screen
 */

function Cart(props) {
  const navigation = useNavigation();
  let count = 0;
  for (let i = 0; i < props.cartData.length; i++) {
    count = count + parseInt(props.cartData[i].total_productCost);
  }
  let gst = parseInt(count * 0.05);
  let total = count + gst;
  const removeItem = (item) => {
    Alert.alert('Remove Item', 'Do You ant to Remove Item from cart', [
      {
        text: 'OK',
        onPress: () => {
          showToast(item);
        },
      },
      {
        text: 'Cancle',
      },
    ]);
  };

  const showToast = (item) => {
    props.removeFromCart(item);
    if (props.userData.length !== 0) {
      props.deleteCart(item, props.userData.data.token);
    }
    Toast.show('Item Removed from Cart');
  };

  if (props.error) {
    return <Somethingwrong />;
  }

  if (props.cartData.length === 0) {
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
          No Product in Cart
        </Text>
      </View>
    );
  } else {
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <ScrollView>
            {props.cartData.map((item, index) => {
              return (
                <View key={index}>
                  <View key={index} style={styles.card}>
                    <View style={styles.cardImgWrapper}>
                      <Image
                        source={{
                          uri: `${baseUrl}/${item.product_id.product_image}`,
                        }}
                        resizeMode="cover"
                        style={styles.cardImg}
                      />
                    </View>
                    <View style={styles.cardInfo}>
                      <Text style={styles.cardTitle}>
                        {item.product_id.product_name}
                      </Text>
                      <Text style={styles.cardDetail}>
                        Quantity : {item.quantity}
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        <View>
                          <Text
                            style={{
                              ...styles.cardDetail,
                              color: '#eb9800',
                            }}>
                            {'\u20B9'}
                            {item.total_productCost}
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row', left: 50}}>
                          <TouchableOpacity
                            onPress={() => {
                              if (
                                item.quantity > item.product_id.product_stock
                              ) {
                                Toast.show(
                                  `Only ${item.product_id.product_stock} in stock`,
                                );
                              } else if (item.quantity < 10) {
                                props.increamentQuantity(item);
                              } else {
                                Toast.show('Maximum Limit reached');
                              }
                            }}>
                            <Text style={styles.countButton}>+</Text>
                          </TouchableOpacity>

                          <Text style={styles.countButton}>
                            {item.quantity}
                          </Text>

                          <TouchableOpacity
                            onPress={() => {
                              if (item.quantity > 1) {
                                props.decrementQuantity(item);
                              } else {
                                Toast.show('Minimum Quantity Reached');
                              }
                            }}>
                            <Text style={styles.countButton}>-</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View style={styles.icon}>
                        <TouchableOpacity
                          onPress={() => {
                            removeItem(item);
                          }}>
                          <FontAwesome
                            name="times"
                            size={15}
                            color={'#444'}
                            style={{padding: 5}}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 20,
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>
                  Sub Total:
                </Text>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>GST(5%)</Text>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>
                  Total Amount
                </Text>
              </View>
              <View style={{paddingRight: 10}}>
                <Text style={{fontSize: 18}}>
                  {'\u20B9'} {count}{' '}
                </Text>
                <Text style={{fontSize: 18}}>
                  {'\u20B9'} {gst}
                </Text>
                <Text style={{fontSize: 18}}>
                  {' '}
                  {'\u20B9'} {total}
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <View>
            <Text style={{fontSize: 22, paddingLeft: 30, fontWeight: 'bold'}}>
              {'\u20B9'} {total}
            </Text>
          </View>
          <View style={styles.button}>
            <Button
              title="Place Order"
              onPress={() => {
                navigation.navigate('OrderSummary', {
                  total: total,
                });
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.cartReducer.loading,
    cartData: state.cartReducer.cartData,
    userData: state.loginReducer.user,
    error: state.dashboardReducer.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (item) => dispatch(removeFromCart(item)),
    deleteCart: (item, token) => dispatch(deleteCart(item, token)),
    increamentQuantity: (item) => dispatch(increamentQuantity(item)),
    decrementQuantity: (item) => dispatch(decrementQuantity(item)),
  };
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 20,
    marginBottom: 70,
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
    flex: 1,
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
  countButton: {
    height: 30,
    width: 30,
    borderWidth: 1,
    fontSize: 22,
    color: '#444',
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  icon: {
    position: 'absolute',
    right: 3,
    top: 3,
    borderRadius: 60,
    backgroundColor: '#e7e7e7',
  },
  button: {
    width: 200,
    height: 30,
    borderRadius: 2,
    marginLeft: 80,
  },
  footer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingTop: 7,
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    backgroundColor: 'white',
    paddingVertical: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
