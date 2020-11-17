import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {baseUrl} from '../shared/config';
import {cardStyles} from '../shared/Styles/cardStyle';
import axios from 'axios';
import {connect} from 'react-redux';
import {PermissionsAndroid, Alert} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

/**
 * @author Devashree Patole
 * @description This screen contains the oirdwr detail tob be displayed
 * @param {object} route this contain the order detail
 * @returns JSX of Order Detail Screen
 */
function OrderDetail({route, userData}) {
  const orders = route.params.data;
  const totalCost = orders[0].total_cartCost;

  const download = () => {
    let orderData = {};
    orderData.product_details = orders;
    orderData._id = orders[0].order_id;
    console.log('orders', orderData);
    axios
      .post(`${baseUrl}/getInvoiceOfOrder`, orderData, {
        headers: {Authorization: `bearer ${userData.data.token}`},
      })
      .then((response) => {
        console.log('response', response);
        downloadFile(response.data.receipt);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const downloadFile = async (data) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        actualDownload(data);
      } else {
        Alert.alert(
          'Permission Denied!',
          'You need to give storage permission to download the file',
        );
      }
    } catch (err) {
      console.warn('err', err);
    }
  };

  const actualDownload = (data) => {
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
      },
    })
      .fetch('GET', `${baseUrl}/${data}`, {})
      .then((res) => {
        console.log('The file saved to ', res.path());
      })
      .catch((e) => {
        console.log(e);
      });
  };

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
          <TouchableOpacity
            onPress={() => {
              download();
            }}>
            <View
              style={{
                width: 300,
                height: 50,
                backgroundColor: '#2874F0',
                borderRadius: 8,
                marginBottom: 20,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 50,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: 18,
                }}>
                Download Invoice As Pdf
              </Text>
            </View>
          </TouchableOpacity>
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

const mapStateToProps = (state) => {
  return {
    userData: state.loginReducer.user,
  };
};

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

export default connect(mapStateToProps)(OrderDetail);
