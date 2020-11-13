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

/**
 * @author Devashree Patole
 * @description This is a modal which contains the array of colors which is diplayed for the user
 *              to select the color and based on that the products will be filtered.
 * @param {object} visible It constains the visibility of the modal
 * @param {function} closeModal This function is call to cxlose the modal
 * @param {object} colorsList list of colors
 * @param {function} selectColor function to save seleted color
 * @param {function} productByColor function to call api
 * @returns JSX of Modal
 */
export default function ColorModal({
  visible,
  closeModal,
  colorsList,
  selectColor,
  productByColor,
}) {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={{backgroundColor: '#000000aa', flex: 1}}>
        <View style={styles.modalStyle}>
          <View style={{margin: 10, borderRadius: 10}}>
            <View style={styles.header}>
              <Text
                style={{
                  fontSize: 18,
                  padding: 20,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                Select Color
              </Text>
              <FontAwesome
                name="times"
                size={20}
                style={styles.icon}
                color={'white'}
                onPress={() => {
                  closeModal();
                }}
              />
            </View>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {colorsList.map((item, index) => {
                return (
                  <View key={index}>
                    <TouchableOpacity
                      onPress={() => {
                        selectColor({
                          color_id: item.color_id,
                          color_name: item.color_name,
                          color_code: item.color_code,
                        });
                      }}>
                      <View
                        style={{
                          height: 30,
                          width: 30,
                          backgroundColor: item.color_code,
                          marginTop: 15,
                          marginLeft: 5,
                        }}></View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
            <View style={styles.button}>
              <Button
                title="Filter"
                color={'#b8b8b8'}
                onPress={() => {
                  productByColor();
                }}></Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalStyle: {
    backgroundColor: 'white',
    marginHorizontal: 50,
    marginVertical: 150,
    borderRadius: 20,
  },
  header: {
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderBottomColor: '#777',
    position: 'relative',
    shadowColor: '#777',
    elevation: 1,
    flexDirection: 'row',
    backgroundColor: '#b8b8b8',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  icon: {
    position: 'relative',
    left: 60,
    paddingLeft: 30,
    paddingTop: 20,
  },
  button: {
    borderRadius: 2,
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
});
