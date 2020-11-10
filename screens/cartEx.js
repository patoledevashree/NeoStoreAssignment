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
import {Formik} from 'formik';
import {connect} from 'react-redux';
import {getCartData} from '../redux/action/CartAction';
import LottieView from 'lottie-react-native';

/**
 * @author Devashree Patole
 * @description This screen contains the lIst of products which are present in cart
 *              and also the total amout of the products.There ius also a button to place order
 *              and to remove products from cart
 * @returns JSX of cart Screen
 */
function Cart(props) {
  const token = props.route.params.token;
  useEffect(() => {
    props.getCartData(token);
  }, []);
  console.log('token', token);
  console.log('cartdata', props.cartData);

  const removeItem = () => {
    Alert.alert('Remove Item', 'Do You ant to Remove Item from cart', [
      {
        text: 'OK',
        onPress: () => {
          showToast();
        },
      },
      {
        text: 'Cancle',
      },
    ]);
  };

  const showToast = () => {
    console.log('Item Removed');
    Toast.show('Item Removed from Cart');
  };
  if (props.loading) {
    return (
      <LottieView
        source={require('../assests/images/4383-circle-loader.json')}
        autoPlay
        loop
      />
    );
  } else {
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <View style={styles.container}>
            {props.cartData?.product_details.map((item, index) => {
              return (
                <Formik
                  initialValues={{quantity: item.quantity}}
                  onSubmit={(values) => {}}>
                  {(props) => (
                    <View key={index} style={styles.card}>
                      <View style={styles.cardImgWrapper}>
                        <Image
                          source={{
                            uri: `http://180.149.241.208:3022/${item.product_id.product_image}`,
                          }}
                          // resizeMode="contain"
                          style={styles.cardImg}
                        />
                      </View>
                      <View style={styles.cardInfo}>
                        <Text style={styles.cardTitle}>
                          {item.product_id.product_name}
                        </Text>
                        <Text style={styles.cardDetail}>
                          Quantity : {props.values.quantity}
                        </Text>
                        <Text style={{...styles.cardDetail, color: '#eb9800'}}>
                          {'\u20B9'}
                          {item.product_cost}
                        </Text>

                        <View style={{flexDirection: 'row', left: 100}}>
                          <TouchableOpacity
                            onPress={() => {
                              props.values.quantity < 5
                                ? props.setFieldValue(
                                    'quantity',
                                    props.values.quantity + 1,
                                  )
                                : Toast.show('Limit Exceeded');
                            }}>
                            <Text style={styles.countButton}>+</Text>
                          </TouchableOpacity>

                          <Text style={styles.countButton}>
                            {props.values.quantity}
                          </Text>

                          <TouchableOpacity
                            onPress={() => {
                              props.values.quantity > 1
                                ? props.setFieldValue(
                                    'quantity',
                                    props.values.quantity - 1,
                                  )
                                : Toast.show('Quantity must be 1');
                            }}>
                            <Text style={styles.countButton}>-</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.icon}>
                          <TouchableOpacity
                            onPress={() => {
                              removeItem();
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
                  )}
                </Formik>
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
                <Text style={{fontWeight: 'bold', fontSize: 18}}>
                  Delivery Charges :
                </Text>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>GST(10%)</Text>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>
                  ToTal Amount
                </Text>
              </View>
              <View style={{paddingRight: 10}}>
                <Text style={{fontSize: 18}}>{'\u20B9'} 2,000</Text>
                <Text style={{fontSize: 18}}>{'\u20B9'} 200</Text>
                <Text style={{fontSize: 18}}>{'\u20B9'} 20</Text>
                <Text style={{fontSize: 18}}> {'\u20B9'} 2220</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <View>
            <Text style={{fontSize: 22, paddingLeft: 30, fontWeight: 'bold'}}>
              {'\u20B9'} 20000
            </Text>
          </View>
          <View style={styles.button}>
            <Button title="Place Order" />
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCartData: (token) => dispatch(getCartData(token)),
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
    marginLeft: 90,
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
