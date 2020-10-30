import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-simple-toast';

export default function UpdateAddress() {
    const [addressList, setAddress] = useState([
        {
            address: '10,Prakasj building,Nilemore,Station Road,Vasai west',
            pinCode: 401203,
            city: 'Mumbai',
            country: 'India'
        },
        {
            address: '304/A, Natraj Apt. Chedda Marg, Hotel Manthan, Virar East',
            pinCode: 401206,
            city: 'Mumbai',
            country: 'India'
        },
        {
            address: 'Gala no. 20, Bapat Marg, Nilkanth Chowk, Plaghar',
            pinCode: 402203,
            city: 'Mumbai',
            country: 'India'
        },
    ])

    const removeAddress = () => {
        Toast.show('Address Deleted');
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                {addressList.map((item, index) => {
                    return (
                        <View key={index} style={styles.cardWrapper}>
                            <View style={styles.card}>
                                <View style={{ paddingLeft: 20, paddingTop: 30 }}>
                                    <Text style={{ fontSize: 18 }}>{item.address}</Text>
                                    <Text style={{ fontSize: 18, paddingTop: 5 }}>{item.city} - {item.pinCode}</Text>
                                    <Text style={{ fontSize: 18, paddingTop: 5 }}>{item.country}</Text>
                                    <View style={{ width: 150, marginVertical: 20 }}>
                                        <Button title='Edit' />
                                    </View>
                                    <View style={styles.icon}>
                                        <TouchableOpacity onPress={() => { removeAddress() }}>
                                            <FontAwesome name='times' size={15}
                                                color={'#444'}
                                                style={{ padding: 5 }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10
    },
    cardWrapper: {
        width: '90%',
        alignSelf: 'center'
    },
    card: {
        marginTop: 6,
        marginBottom: 20,
        flexDirection: 'row',
        shadowColor: '#777',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.6,
        shadowRadius: 2,
        elevation: 5,
        borderRadius: 5
    },
    icon: {
        position: 'absolute',
        right: 6,
        top: 6,
        borderRadius: 60,
        backgroundColor: '#e7e7e7'
    },
})