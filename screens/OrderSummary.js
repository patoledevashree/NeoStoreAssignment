import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {orderProduct} from '../redux/action/CartAction';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import {baseUrl} from '../shared/config';

/**
 * @author Devashree Patole
 * @description This screen is for the user to place order
 * @param {object} props  This object contains the total and the product detail
 * @returns JSX od Order Summary
 */
function OrderSummary(props) {
  const navigation = useNavigation();
  const total = props.route.params.total;
  const product = props.route.params.product;
  const [address, setAddress] = useState({});
  const [isdisabled, setdisable] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const Address = (address) => {
    setAddress(address);
    setdisable(false);
  };

  const order = () => {
    props.orderProduct(props.cartData, props.userData.data.token);
    navigation.navigate('ThankYou');
  };

  const buyProduct = () => {
    const cartCheckout = [];
    let i = 0;
    cartCheckout[0] = product;
    cartCheckout[0].quantity = quantity;
    cartCheckout[0].total = quantity * parseInt(product.product_cost);
    cartCheckout[1] = {flag: 'checkout'};

    axios
      .post(`${baseUrl}/addProductToCartCheckout`, cartCheckout, {
        headers: {Authorization: `bearer ${props.userData.data.token}`},
      })
      .then((response) => {
        navigation.navigate('ThankYou');
      })
      .catch((error) => {
        // console.log('error', error.response);
      });
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <View style={{marginLeft: 20}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
            {props.userData?.data.customer_details.first_name}{' '}
            {props.userData?.data.customer_details.last_name}
          </Text>
        </View>
        {address.address === undefined ? (
          <View></View>
        ) : (
          <View style={{marginHorizontal: 20, marginTop: 10}}>
            <Text style={{fontSize: 15}}>{address.address}</Text>
            <Text style={{fontSize: 15}}>
              {address.city} - {address.pincode}
            </Text>
          </View>
        )}
        <View style={{marginHorizontal: 20, marginTop: 20}}>
          <Button
            title="Select Address"
            onPress={() => {
              navigation.navigate('SelectAddress', {
                token: props.userData.data.token,
                onSelect: Address,
              });
            }}
          />
        </View>
        {product !== undefined ? (
          <View
            style={{borderTopWidth: 1, marginTop: 20, marginHorizontal: 20}}>
            <View style={{marginTop: 20, marginLeft: 10}}>
              <View>
                <Image
                  style={{
                    height: 150,
                    width: 350,
                    borderRadius: 8,
                  }}
                  source={{
                    uri: `${baseUrl}/${product.product_image}`,
                  }}
                />
              </View>
              <View>
                <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 10}}>
                  {product.product_name}
                </Text>
                <Text style={{fontSize: 18, marginTop: 5}}>
                  Quantity : {quantity}
                </Text>
                <Text style={{fontSize: 18, marginTop: 5}}>
                  Price :{' '}
                  <Text style={{color: '#eb9800'}}>
                    {'\u20B9'} {quantity * parseInt(product.product_cost)}
                  </Text>
                </Text>
                <View style={{marginTop: 10, flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      paddingRight: 20,
                    }}>
                    Select Quantity
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setQuantity(quantity + 1);
                    }}>
                    <Text style={styles.countButton}>+</Text>
                  </TouchableOpacity>
                  <Text style={styles.countButton}>{quantity}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      quantity > 1
                        ? setQuantity(quantity - 1)
                        : Toast.show('Quantity must be atleast 1');
                    }}>
                    <Text style={styles.countButton}>-</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View>
            {props.cartData.map((item, index) => {
              return (
                <View key={index}>
                  <View
                    style={{
                      borderTopWidth: 1,
                      marginTop: 20,
                      marginHorizontal: 20,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 20,
                      }}>
                      <View>
                        <Image
                          source={{
                            uri: `${baseUrl}/${item.product_id.product_image}`,
                          }}
                          style={styles.image}
                        />
                      </View>
                      <View
                        style={{
                          marginLeft: 10,
                          paddingRight: 30,
                          flex: 1,
                        }}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            fontSize: 20,
                            paddingTop: 5,
                          }}>
                          {item.product_id.product_name}
                        </Text>
                        <Text style={{fontSize: 18, paddingTop: 5}}>
                          Quantity : {item.quantity}
                        </Text>
                        <Text style={{fontSize: 18, paddingTop: 5}}>
                          Price :
                          <Text style={{color: '#eb9800'}}>
                            {' '}
                            {'\u20B9'}
                            {item.total_productCost}
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </View>
      <View style={styles.footer}>
        <View>
          <Text style={{fontSize: 22, paddingLeft: 30, fontWeight: 'bold'}}>
            {'\u20B9'}{' '}
            {total === '' ? quantity * parseInt(product.product_cost) : total}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            ...styles.button,
            backgroundColor: isdisabled ? '#607D8B' : '#2874F0',
          }}
          disabled={isdisabled}
          onPress={() => {
            product === undefined ? order() : buyProduct();
          }}>
          <Text style={{fontSize: 18, textAlign: 'center', color: 'white'}}>
            Order Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    cartData: state.cartReducer.cartData,
    userData: state.loginReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    orderProduct: (cartItem, token) => dispatch(orderProduct(cartItem, token)),
  };
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  button: {
    width: 200,
    height: 30,
    borderRadius: 5,
    marginLeft: 80,
    borderWidth: 1,
    borderColor: '#2874F0',
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
    marginHorizontal: 10,
  },
  image: {
    height: 130,
    width: 130,
    borderRadius: 8,
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
});
export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);
