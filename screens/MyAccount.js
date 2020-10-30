import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Avatar, Title } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

/**
 * @author Devashree Patole
 * @description This screen is to display user profile.It contains the profile image, phone no,
 *              email-id,it also contains the stack navigation of orders ,change Password,
 *              edit profile,add address and update address
 * @returns JSX of Myaccount screen
 */
export default function MyAccount() {
    const navigation = useNavigation();
    return (
        <View>
            <View style={{ flexDirection: 'row' }}>
                <Avatar.Image
                    source={require('../assests/images/avtar.png')}
                    size={100}
                    rounded
                    style={{ marginTop: 30, marginLeft: 30 }}
                />
                <View style={{ marginLeft: 30, marginTop: 60 }}>
                    <Title style={{ fontSize: 22 }}>Devashree Patole</Title>
                </View>
            </View>

            <View>
                <View style={{ marginLeft: 30, marginTop: 20, flexDirection: 'row' }}>
                    <FontAwesome name='phone-alt' size={20} color={'black'} />
                    <Text style={{ fontSize: 18, marginLeft: 20 }}>9172358436</Text>
                </View>
                <View style={{ marginLeft: 30, marginTop: 10, flexDirection: 'row' }}>
                    <FontAwesome name='envelope' size={20} />
                    <Text style={{ fontSize: 18, marginLeft: 20 }}>devashree.patole@neosoftmail.com</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <View style={{
                    borderTopWidth: 1,
                    borderRightWidth: 1
                }}>
                    <View style={styles.content}>
                        <Text style={styles.contentText}>{'\u20B9'} 0</Text>
                        <Text style={styles.contentText}> Wallet</Text>
                    </View>
                </View>
                <View style={{
                    borderTopWidth: 1
                }}>
                    <View style={styles.content}>
                        <Text style={styles.contentText}> 0</Text>
                        <Text style={styles.contentText}>Orders</Text>
                    </View>
                </View>
            </View>

            <View style={{ borderTopWidth: 1 }}>
                <TouchableOpacity onPress={()=>{navigation.navigate('Orders')}}>
                    <View style={styles.action}>
                        <View style={styles.icon}>
                            <FontAwesome name='first-order' size={35} color={'white'}
                                style={{ paddingLeft: 10, paddingTop: 5 }} />
                        </View>
                        <View style={{ marginLeft: 40, marginTop: 10 }}>
                            <Text style={{ fontSize: 20 }}>My orders</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ borderTopWidth: 1 }}>
                <TouchableOpacity onPress={()=>{navigation.navigate('ChangePassword')}}>
                    <View style={styles.action}>
                        <View style={styles.icon}>
                            <FontAwesome name='lock' size={25} color={'white'}
                                style={{ paddingTop: 10, paddingLeft: 15 }} />
                        </View>
                        <View style={{ marginLeft: 40, marginTop: 10 }}>
                            <Text style={{ fontSize: 20 }}>Change Password</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ borderTopWidth: 1 }}>
                <TouchableOpacity onPress={()=>{navigation.navigate('AddAddress')}}>
                    <View style={styles.action}>
                        <View style={styles.icon}>
                            <FontAwesome name='address-card' size={25} color={'white'}
                                style={{ paddingLeft: 10, paddingTop: 10 }} />
                        </View>
                        <View style={{ marginLeft: 40, marginTop: 10 }}>
                            <Text style={{ fontSize: 20 }}>Add Address</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ borderTopWidth: 1 }}>
                <TouchableOpacity onPress={()=>{navigation.navigate('UpdateAddress')}}>
                    <View style={styles.action}>
                        <View style={styles.icon}>
                            <FontAwesome name='address-card' size={25} color={'white'}
                                style={{ paddingLeft: 10, paddingTop: 10 }} />
                        </View>
                        <View style={{ marginLeft: 40, marginTop: 10 }}>
                            <Text style={{ fontSize: 20 }}>Update Address</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        marginVertical: 15,
        marginHorizontal: 80
    },
    contentText: {
        fontSize: 18,
    },
    action: {
        marginVertical: 10,
        flexDirection: 'row'
    },
    icon: {
        height: 50,
        width: 50,
        borderRadius: 30,
        backgroundColor: '#2874F0',
        marginLeft: 20
    },
})