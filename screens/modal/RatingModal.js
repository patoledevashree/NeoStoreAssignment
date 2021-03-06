import React, {useState} from 'react';
import {View, Text, Modal, StyleSheet, Button} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {AirbnbRating} from 'react-native-ratings';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import {baseUrl} from '../../shared/config';
import {globalStyles} from '../../shared/Styles/modalStyles';

/**
 * @author Devashree Patole
 * @description This modal is for the user to rate the product if the user is logged in and it not user is redirected to
 * login screen
 * @param {object} visible It constains the visibility of the modal
 * @param {function} closeModal This function is call to close the modal
 * @returns JSX of Modal
 */
export default function RatingModal({visible, closeModal, token, productId}) {
  const [rating, setRating] = useState('');

  const rateProduct = () => {
    axios
      .put(
        `${baseUrl}/updateProductRatingByCustomer`,
        {
          product_id: productId,
          product_rating: rating,
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      )
      .then((response) => {
        closeModal();
        Toast.show(response.data.message);
      })
      .catch((error) => {
        // console.log(error.response);
        Toast.show(error.response.data.message);
      });
  };
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={{backgroundColor: '#000000aa', flex: 1}}>
        <View style={globalStyles.modalStyle}>
          <View style={{margin: 10, borderRadius: 10}}>
            <View style={globalStyles.header}>
              <Text
                style={{
                  fontSize: 22,
                  padding: 20,
                  fontWeight: 'bold',
                  color: 'white',
                  marginLeft: 30,
                }}>
                Rate
              </Text>
              <FontAwesome
                name="times"
                size={20}
                style={globalStyles.icon}
                color={'white'}
                onPress={() => {
                  closeModal();
                }}
              />
            </View>
            <View style={styles.rate}>
              <View style={{padding: 10}}>
                <AirbnbRating
                  count={5}
                  reviews={['Bad', 'Ok', 'Good', 'Very Good', 'Amazing']}
                  showRating={true}
                  onFinishRating={(rate) => {
                    setRating(rate);
                  }}
                  defaultRating={0}
                  size={30}
                  starStyle={{
                    backgroundColor: '#F2F2F2',
                  }}
                />
              </View>
            </View>
            <View style={globalStyles.button}>
              <Button
                title="Submit Rating"
                color={'#b8b8b8'}
                onPress={() => {
                  rateProduct();
                }}></Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  rate: {
    borderWidth: 1,
    marginVertical: 10,
  },
});
