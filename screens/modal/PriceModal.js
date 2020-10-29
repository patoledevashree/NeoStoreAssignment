import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Button } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

/**
 * @author Devashree Patole
 * @description This modal is use to filter the products in the Products screen based 
 *              on the prices i.e Low to High or High to Low
 * @param {object} visible It constains the visibility of the modal 
 * @param {function} closeModal This function is call to cxlose the modal
 * @returns JSX of Modal
 */

export default function PriceModal({ visible, closeModal }) {
    const [price,setPrice] = useState('')
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType='fade'
        >
            <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
                <View style={styles.modalStyle}>
                    <View style={{ margin: 10, borderRadius: 10 }}>
                        <View style={styles.header}>
                            <Text style={{
                                fontSize: 18,
                                padding: 20,
                                fontWeight: 'bold',
                                color: 'white'
                            }}>Filter Price</Text>
                            <FontAwesome name='times' size={20} style={styles.icon}
                                color={'white'}
                                onPress={() => { closeModal() }}
                            />
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <TouchableOpacity onPress={()=>{setPrice('low')}}>
                                <View style={styles.container}>
                                    <Text style={{
                                        fontSize: 20,
                                        padding: 5,
                                        textAlign: 'center'
                                    }}>Low to High</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>{setPrice('high')}}>
                                <View style={styles.container}>
                                    <Text style={{
                                        fontSize: 20,
                                        padding: 5,
                                        textAlign: 'center'
                                    }}>High to Low</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.button}>
                            <Button title='Filter' color={'#b8b8b8'}
                                onPress={() => { console.log(price) }}></Button>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalStyle: {
        backgroundColor: 'white',
        marginHorizontal: 50,
        marginVertical: 150,
        borderRadius: 20
    },
    icon: {
        position: 'relative',
        left: 60,
        paddingLeft: 30,
        paddingTop: 20
    },
    header: {
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        borderBottomColor: '#777',
        position: 'relative',
        shadowColor: '#777',
        elevation: 1,
        flexDirection: 'row',
        backgroundColor: '#b8b8b8',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    container: {
        marginHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#e7e7e7',
        borderRadius: 10
    },
    button: {
        borderRadius: 2,
        marginTop: 10,
        marginHorizontal: 10,
        marginBottom: 10
    }
})