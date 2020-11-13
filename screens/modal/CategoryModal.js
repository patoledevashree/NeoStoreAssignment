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
 * @description This is a modal which contains list of Categories of product
 *              for the user to select the categoty of product
 *               and based on that the products will be filtered.
 * @param {object} visible It constains the visibility of the modal
 * @param {function} closeModal This function is call to cxlose the modal
 * @param {object} categoryList List of categories
 * @param {function} selectCategory function to store category
 * @param {function} productByCategory function to call api
 * @returns JSX of Modal
 */
export default function CategoryModal({
  visible,
  closeModal,
  categoryList,
  selectCategory,
  productByCategory,
}) {
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
                Select Category
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
              {categoryList.map((item, index) => {
                return (
                  <View key={index}>
                    <TouchableOpacity
                      onPress={() => {
                        selectCategory({
                          category_id: item.category_id,
                          category_name: item.category_name,
                        });
                      }}>
                      <View style={styles.container}>
                        <Text
                          style={{
                            fontSize: 20,
                            padding: 5,
                            textAlign: 'center',
                          }}>
                          {item.category_name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
            <View style={globalStyles.button}>
              <Button
                title="Filter"
                color={'#b8b8b8'}
                onPress={() => {
                  productByCategory();
                }}></Button>
            </View>
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
    backgroundColor: '#e7e7e7',
    borderRadius: 10,
  },
});
