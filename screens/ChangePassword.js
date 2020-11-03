import React from 'react'
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Button,
    ScrollView
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { Formik } from 'formik';
import * as yup from 'yup';

/**
 * @author Devashree Patole
 * @description This screen is for the user to change the existing password
 *              user requires the old password and then a new password
 * @returns JSX of Change Password screen
 */

const validationSchema = yup.object({
    oldPwd: yup
        .string()
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .required()
        .matches('^[a-zA-Z0-9_]*$', 'Password can only contain alphanumeric.'),
    newPwd: yup
        .string()
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .required()
        .matches('^[a-zA-Z0-9_]*$', 'Password can only contain alphanumeric.'),
    crfmPwd: yup
        .string()
        .required()
        .oneOf(
            [yup.ref('newPwd'), null],
            'Passwords must match',
        ),
})

export default function ChangePassword() {
    return (
        <View style={styles.container}>
            <ScrollView>
                <Formik
                    initialValues={{
                        oldPwd: '',
                        newPwd: '',
                        crfmPwd: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log(values)
                    }}
                >
                    {(props) => (
                        <View style={{ marginTop: 30 }}>
                            <View>
                                <FontAwesome name='key' size={25} color={'#777'}
                                    style={styles.icon} />
                                <TextInput style={styles.input}
                                    placeholder='Current Password'
                                    onChangeText={props.handleChange('oldPwd')}
                                    value={props.values.oldPwd}
                                    onBlur={props.handleBlur('oldPwd')}
                                />
                                {props.touched.oldPwd && props.errors.oldPwd && (
                                    <Text style={styles.error}>
                                        {props.touched.oldPwd && props.errors.oldPwd}
                                    </Text>
                                )}
                            </View>

                            <View>
                                <FontAwesome name='key' size={25} color={'#777'}
                                    style={styles.icon} />
                                <TextInput style={styles.input}
                                    placeholder='New Password'
                                    onChangeText={props.handleChange('newPwd')}
                                    value={props.values.newPwd}
                                    onBlur={props.handleBlur('newPwd')}
                                />
                                {props.touched.newPwd && props.errors.newPwd && (
                                    <Text style={styles.error}>
                                        {props.touched.newPwd && props.errors.newPwd}
                                    </Text>
                                )}

                            </View>

                            <View>
                                <FontAwesome name='key' size={25} color={'#777'}
                                    style={styles.icon} />
                                <TextInput style={styles.input}
                                    placeholder='Confirm Password'
                                    onChangeText={props.handleChange('crfmPwd')}
                                    value={props.values.crfmPwd}
                                    onBlur={props.handleBlur('crfmPwd')}
                                />
                                {props.touched.crfmPwd && props.errors.crfmPwd && (
                                    <Text style={styles.error}>
                                        {props.touched.crfmPwd && props.errors.crfmPwd}
                                    </Text>
                                )}

                            </View>

                            <View style={{ borderRadius: 10, marginTop: 20, width: 300 }}>
                                <Button title='Change Password' color={'#2874F0'}
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
        paddingLeft: 50
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