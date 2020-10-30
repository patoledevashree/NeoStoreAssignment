import React from 'react'
import { View, Text, StyleSheet, TextInput, Button, ScrollView } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

const validationSchema = yup.object({
    address: yup
        .string()
        .required(),
    pinCode: yup
        .string()
        .min(6)
        .max(6)
        .required(),
    city: yup
        .string()
        .required(),
    state: yup
        .string()
        .required(),
    country: yup
        .string()
        .required(),
})

export default function AddAddress() {
    return (
        <View style={styles.container}>
            <ScrollView>
                <Formik
                    initialValues={{
                        address: '',
                        pinCode: '',
                        city: '',
                        state: '',
                        country: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log(values)
                    }}
                >
                    {(props) => (
                        <View>
                            <View>
                                <FontAwesome name='address-card' size={25} color={'#777'}
                                    style={styles.icon}
                                />
                                <TextInput style={styles.input}
                                    multiline
                                    placeholder='Enter Your Adddress'
                                    onChangeText={props.handleChange('address')}
                                    value={props.values.address}
                                    onBlur={props.handleBlur('address')}
                                />
                                 {props.touched.address && props.errors.address && (
                                    <Text style={styles.error}>
                                        {props.touched.address && props.errors.address}
                                    </Text>
                                )}
                            </View>

                            <View>
                                <FontAwesome name='map-pin' size={25} color={'#777'}
                                    style={styles.icon}
                                />
                                <TextInput style={styles.input}
                                    keyboardType='numeric'
                                    placeholder='Enter Your Pin Code '
                                    onChangeText={props.handleChange('pinCode')}
                                    value={props.values.pinCode}
                                    onBlur={props.handleBlur('pinCode')}
                                />
                                 {props.touched.pinCode && props.errors.pinCode && (
                                    <Text style={styles.error}>
                                        {props.touched.pinCode && props.errors.pinCode}
                                    </Text>
                                )}
                            </View>

                            <View>
                                <FontAwesome name='city' size={25} color={'#777'}
                                    style={styles.icon}
                                />
                                <TextInput style={styles.input}
                                    placeholder='Enter Your City '
                                    onChangeText={props.handleChange('city')}
                                    value={props.values.city}
                                    onBlur={props.handleBlur('city')}
                                />
                                 {props.touched.city && props.errors.city && (
                                    <Text style={styles.error}>
                                        {props.touched.city && props.errors.city}
                                    </Text>
                                )}
                            </View>

                            <View>
                                <FontAwesome name='landmark' size={25} color={'#777'}
                                    style={styles.icon}
                                />
                                <TextInput style={styles.input}
                                    placeholder='Enter Your State '
                                    onChangeText={props.handleChange('state')}
                                    value={props.values.state}
                                    onBlur={props.handleBlur('state')}
                                />
                                {props.touched.state && props.errors.state && (
                                    <Text style={styles.error}>
                                        {props.touched.state && props.errors.state}
                                    </Text>
                                )}
                            </View>

                            <View>
                                <FontAwesome name='globe' size={25} color={'#777'}
                                    style={styles.icon}
                                />
                                <TextInput style={styles.input}
                                    placeholder='Enter Your Country '
                                    onChangeText={props.handleChange('country')}
                                    value={props.values.country}
                                    onBlur={props.handleBlur('country')}
                                />
                                 {props.touched.country && props.errors.country && (
                                    <Text style={styles.error}>
                                        {props.touched.country && props.errors.country}
                                    </Text>
                                )}
                            </View>

                            <View style={{ borderRadius: 10, marginTop: 20, width: 300 }}>
                                <Button title='Submit' color={'#2874F0'}
                                    onPress={props.handleSubmit} />
                            </View>
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        marginHorizontal: 50
    },
    input: {
        width: 300,
        borderWidth: 1,
        paddingLeft: 60
    },
    icon: {
        top: 35,
        left: 15,
        position: 'relative'
    },
    error: {
        color: 'crimson',
        fontSize: 15
    }
})