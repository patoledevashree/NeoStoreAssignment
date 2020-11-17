import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {globalStyles} from '../../shared/Styles/modalStyles';

/**
 * @author Devashree Patole
 * @description This modal is use to filter the products in the Products screen based
 *              on the prices i.e Low to High or High to Low
 * @param {object} visible It constains the visibility of the modal
 * @param {function} closeModal This function is call to cxlose the modal
 * @param {function} selectPrice function to select price
 * @param {function} productByPrice function to call api
 * @returns JSX of Modal
 */

export default function PriceModal({
  visible,
  closeModal,
  selectPrice,
  productByPrice,
  selectedPrice,
}) {
  const [price, setPrice] = useState(selectedPrice);
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={{backgroundColor: '#000000aa', flex: 1}}>
        <View style={globalStyles.modalStyle}>
          <View style={{margin: 10, borderRadius: 10}}>
            <View style={globalStyles.header}>
              <Text
                style={{
                  fontSize: 18,
                  padding: 20,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                Filter Price
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
            <View style={{marginTop: 10}}>
              <TouchableOpacity
                onPress={() => {
                  setPrice(false);
                  selectPrice({
                    sortBy: 'product_cost',
                    sortIn: false,
                  });
                }}>
                <View
                  style={{
                    ...styles.container,
                    backgroundColor: price === false ? '#2874F0' : '#e7e7e7',
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      padding: 5,
                      textAlign: 'center',
                    }}>
                    Low to High
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setPrice(true);
                  selectPrice({
                    sortBy: 'product_cost',
                    sortIn: true,
                  });
                }}>
                <View
                  style={{
                    ...styles.container,
                    backgroundColor: price === true ? '#2874F0' : '#e7e7e7',
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      padding: 5,
                      textAlign: 'center',
                    }}>
                    High to Low
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {/* <View style={globalStyles.button}>
              <Button
                title="Filter"
                color={'#b8b8b8'}
                onPress={() => {
                  productByPrice();
                }}></Button>
            </View> */}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
});
