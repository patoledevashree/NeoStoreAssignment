import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

function OrderSummary(props) {
  const navigation = useNavigation();
  const total = props.route.params.total;
  const [address, setAddress] = useState('');

  const Address = (address) => {
    setAddress(address);
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
        <View style={{marginHorizontal: 20, marginTop: 20}}>
          <Button
            title="Select Address"
            onPress={() => {
              navigation.navigate('SelectAddress', {
                token: props.userData.data.token,
              });
            }}
          />
        </View>
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
                        uri: `http://180.149.241.208:3022/${item.product_id.product_image}`,
                      }}
                      style={styles.image}
                    />
                  </View>
                  <View style={{marginHorizontal: 10}}>
                    <Text
                      style={{fontWeight: 'bold', fontSize: 20, paddingTop: 5}}>
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
      <View style={styles.footer}>
        <View>
          <Text style={{fontSize: 22, paddingLeft: 30, fontWeight: 'bold'}}>
            {'\u20B9'} {total}
          </Text>
        </View>
        <View style={styles.button}>
          <Text style={{fontSize: 18, textAlign: 'center', color: 'white'}}>
            Order Now
          </Text>
        </View>
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
    backgroundColor: '#2874F0',
    borderColor: '#2874F0',
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
  image: {
    height: 150,
    width: 150,
  },
});
export default connect(mapStateToProps)(OrderSummary);
