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
import {cardStyles} from '../shared/Styles/cardStyle';

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
  for (let i = 0; i < props.cartData?.length; i++) {
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

  if (props.cartData?.length === 0 || props.cartData === null) {
    return (
      <View style={{marginVertical: 20}}>
        <FontAwesome
          name="frown-open"
          size={200}
          color={'#e7e7e7'}
          style={{
            marginLeft: 80,
            marginVertical: 10,
            // flex: 1,
            // justifyContent: 'center',
            // alignItems: 'center',
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
        <ScrollView>
          <View style={styles.container}>
            {props.cartData?.map((item, index) => {
              return (
                <View key={index}>
                  <View key={index} style={cardStyles.card}>
                    <View style={cardStyles.cardImgWrapper}>
                      <Image
                        source={{
                          uri: `${baseUrl}/${item.product_id.product_image}`,
                        }}
                        resizeMode="cover"
                        style={cardStyles.cardImg}
                      />
                    </View>
                    <View style={cardStyles.cardInfo}>
                      <Text style={cardStyles.cardTitle}>
                        {item.product_id.product_name}
                      </Text>
                      <Text style={cardStyles.cardDetail}>
                        Quantity : {item.quantity}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View>
                          <Text
                            style={{
                              ...cardStyles.cardDetail,
                              color: '#eb9800',
                            }}>
                            {'\u20B9'}
                            {item.total_productCost}
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
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
          </View>
        </ScrollView>
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
                if (props.userData?.data?.token) {
                  navigation.navigate('OrderSummary', {
                    total: total,
                  });
                } else {
                  Alert.alert('You Are not Logged In');
                  navigation.navigate('Login');
                }
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

  countButton: {
    height: 28,
    width: 28,
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
    width: 300,
    height: 30,
    borderRadius: 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '100%',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
