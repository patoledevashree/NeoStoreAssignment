import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Button,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native'
import { Avatar } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import { Formik } from 'formik';
import RadioForm from 'react-native-simple-radio-button';
import * as yup from 'yup';
import { ScrollView } from 'react-native-gesture-handler';

/**
 * @author Devashree Patole
 * @description This screen is for the user to edit the profile here user can change the profile image
 *              first name, last name, gender,email, phone no
 * @returns JSX of Profile Edit screen
 */

var radio_props = [
    { label: 'Male', value: 0 },
    { label: 'Female', value: 1 }
];

const validationSchema = yup.object({
    firstName: yup
        .string()
        .min(4)
        .required(),
    lastName: yup
        .string()
        .min(4)
        .required(),
    email: yup
        .string()
        .email()
        .required(),
    phone: yup
        .string()
        .max(10)
        .min(10)
        .required(),
    gender: yup
        .string()
        .required()
})


export default function ProfileEdit() {
    const [photo, setPhoto] = useState('');
    const handelPhoto = () => {
        const options = {
            noData: true,
        };
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                setPhoto(response.uri)

            }
        });
    };

    return (
        <TouchableWithoutFeedback onPress={()=>{
            Keyboard.dismiss();
        }}>
            <View style={styles.container}>
                <ScrollView>
                    <View style={{ marginTop: 20, marginHorizontal: 120 }}>
                        <TouchableOpacity onPress={() => { handelPhoto() }}>
                            <View>
                                {!photo ?
                                    <Avatar.Image
                                        source={require('../assests/images/avtar.png')}
                                        rounded
                                        size={100}
                                    /> :
                                    <Avatar.Image
                                        source={{
                                            uri: photo
                                        }}
                                        rounded
                                        size={100}
                                    />
                                }
                                <Text style={{
                                    color: '#2874F0',
                                    fontSize: 20,
                                    paddingTop: 10
                                }}>Change Photo</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Formik
                        initialValues={{
                            firstName: 'Devashree',
                            lastName: 'Patole',
                            email: 'devashree.patole@neosoftmail.com',
                            phoneNo: '9172358436',
                            gender: 'Female'
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            console.log(values)
                        }}
                    >
                        {(formikProps) => (
                            <View style={styles.form}>
                                <TextInput style={styles.input}
                                    placeholder='First Name'
                                    onChangeText={formikProps.handleChange('firstName')}
                                    value={formikProps.values.firstName}
                                    onBlur={formikProps.handleBlur('firstName')}
                                />
                                <Text style={styles.error}>
                                    {formikProps.touched.firstName && formikProps.errors.firstName}
                                </Text>

                                <TextInput style={styles.input}
                                    placeholder='Last Name'
                                    onChangeText={formikProps.handleChange('lastName')}
                                    value={formikProps.values.lastName}
                                    onBlur={formikProps.handleBlur('lastName')}
                                />
                                <Text style={styles.error}>
                                    {formikProps.touched.lastName && formikProps.errors.lastName}
                                </Text>

                                <TextInput style={styles.input}
                                    placeholder='Email'
                                    onChangeText={formikProps.handleChange('email')}
                                    value={formikProps.values.email}
                                    onBlur={formikProps.handleBlur('email')}
                                />
                                <Text style={styles.error}>
                                    {formikProps.touched.email && formikProps.errors.email}
                                </Text>

                                <TextInput style={styles.input}
                                    placeholder='Phone No'
                                    onChangeText={formikProps.handleChange('phoneNo')}
                                    value={formikProps.values.phoneNo}
                                    onBlur={formikProps.handleBlur('phoneNo')}
                                />
                                <Text style={styles.error}>
                                    {formikProps.touched.phoneNo && formikProps.errors.phoneNo}
                                </Text>

                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <Text style={{ paddingRight: 10, fontSize: 18 }}>Gender</Text>
                                    <RadioForm
                                        radio_props={radio_props}
                                        initial={1}
                                        formHorizontal={true}
                                        buttonColor={'#2874F0'}
                                        onPress={(val) => {
                                            if (val === 0) {
                                                formikProps.setFieldValue('gender', 'Male');
                                            }
                                            else {
                                                formikProps.setFieldValue('gender', 'Female');
                                            }
                                        }}
                                        selectedButtonColor={'#2874F0'}
                                        labelStyle={{ fontSize: 15, paddingRight: 10 }}
                                    />

                                </View>

                                <View style={{ borderRadius: 10, marginTop: 20, width: 300 }}>
                                    <Button title='Update' color={'#2874F0'}
                                        onPress={formikProps.handleSubmit} />
                                </View>
                            </View>
                        )}

                    </Formik>
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    )
}


const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginHorizontal: 20
    },
    form: {
        marginHorizontal: 30,
        marginTop: 20
    },
    input: {
        borderBottomWidth: 1,
        width: 300,
    },
    error: {
        color: 'crimson',
        fontSize: 15
    }
})