import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity,Button } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

/**
 * @author Devashree Patole
 * @description This is a modal which contains list of Categories of product 
 *              for the user to select the categoty of product
 *               and based on that the products will be filtered.
 * @param {object} visible It constains the visibility of the modal 
 * @param {function} closeModal This function is call to cxlose the modal
 * @returns JSX of Modal
 */
export default function CategoryModal({ visible, closeModal }) {

    const [category, listCategory] = useState([
        { name: 'Bed', key: '1' },
        { name: 'Chair', key: '2' },
        { name: 'Sofa', key: '3' },
        { name: 'Almirah', key: '4' }
    ])
    const [selectedCategory, setCategory] = useState('')
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
                            }}>Select Category</Text>
                            <FontAwesome name='times' size={20} style={styles.icon}
                                color={'white'}
                                onPress={() => { closeModal() }}
                            />
                        </View>
                        <View style={{ marginTop: 10 }}>
                            {category.map((item) => {
                                return (
                                    <View key={item.key}>
                                        <TouchableOpacity onPress={() => { setCategory(item.name) }}>
                                            <View style={styles.container}>
                                                <Text style={{
                                                    fontSize: 20,
                                                    padding: 5,
                                                    textAlign: 'center'
                                                }}>{item.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })}
                        </View>
                        <View style={styles.button}>
                            <Button title='Filter' color={'#b8b8b8'}
                                onPress={() => { console.log(selectedCategory) }}></Button>
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
    button: {
        borderRadius: 2,
        marginTop: 10,
        marginHorizontal: 10,
        marginBottom: 10
    },
    container: {
        marginHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#e7e7e7',
        borderRadius: 10
    }
})