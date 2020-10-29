import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const validationschema = yup.object({
    otp: yup
        .string()
        .min(4)
        .required(),
    password: yup
        .string()
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .required()
        .matches('^[a-zA-Z0-9_]*$', 'Password can only contain alphanumeric.'),
    confirmPwd: yup
        .string()
        .required()
        .oneOf(
            [yup.ref('password'), null],
            'Passwords must match',
        )
})

/**
 * @author Devashree Patole
 * @description This is screen provides the user to set 
 *              the password.Otp, new password and confirm password are the filedsPropTypes.
 * @returns jsx of the setpassword screen
 */

export default function ForgetPassword() {
    const [securePwd, setPassword] = useState(true);
    const [secureCrfm, setCfrmPwd] = useState(true);
    const [pwd_eyeStyle, setPwdIcon] = useState('eye-slash');
    const [crf_eyeStyle, setCrfmIcon] = useState('eye-slash');

    const handlePwdClick = () => {

        setPassword(!securePwd);
        if (pwd_eyeStyle === 'eye-slash') {
            setPwdIcon('eye')
        }
        else {
            setPwdIcon('eye-slash')
        }
    }

    const handleClick = () => {

        setCfrmPwd(!secureCrfm);
        if (crf_eyeStyle === 'eye-slash') {
            setCrfmIcon('eye')
        }
        else {
            setCrfmIcon('eye-slash')
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.container}>
                <Text style={styles.text}>
                    Neo<Text style={{ color: '#2874F0' }}>Store</Text>
                </Text>
                <Formik
                    initialValues={{
                        otp: '',
                        password: '',
                        confirmPwd: ''
                    }}
                    validationSchema={validationschema}
                    onSubmit={(values) => {
                        console.log(values)
                    }}
                >
                    {(props) => (
                        <View>
                            <View>
                                <FontAwesome style={{ position: 'relative', top: 35, left: 15 }}
                                    name='key' size={20}
                                />

                                <TextInput style={styles.input}
                                    placeholder='Enter OTP'
                                    onChangeText={props.handleChange('otp')}
                                    value={props.values.otp}
                                    onBlur={props.handleBlur('otp')}
                                />
                                <Text style={styles.error}>
                                    {props.touched.otp && props.errors.otp}
                                </Text>
                            </View>
                            <View >
                                <FontAwesome style={{ position: 'relative', top: 35, left: 15 }}
                                    name='lock' size={20}
                                />

                                <TextInput style={styles.input}
                                    placeholder='New Password'
                                    secureTextEntry={securePwd}
                                    onChangeText={props.handleChange('password')}
                                    value={props.values.password}
                                    onBlur={props.handleBlur('password')}
                                />
                                <FontAwesome style={{ position: 'absolute', top: 35, right: 5 }}
                                    name={pwd_eyeStyle} size={20}
                                    onPress={handlePwdClick}
                                />
                                <Text style={styles.error}>
                                    {props.touched.password && props.errors.password}
                                </Text>
                            </View>

                            <View >
                                <FontAwesome style={{ position: 'relative', top: 35, left: 15 }}
                                    name='lock' size={20}
                                />

                                <TextInput style={styles.input}
                                    placeholder='Confirm Password'
                                    secureTextEntry={secureCrfm}
                                    onChangeText={props.handleChange('confirmPwd')}
                                    value={props.values.confirmPwd}
                                    onBlur={props.handleBlur('confirmPwd')}
                                />
                                <FontAwesome style={{ position: 'absolute', top: 35, right: 5 }}
                                    name={crf_eyeStyle} size={20}
                                    onPress={handleClick}
                                />
                                <Text style={styles.error}>
                                    {props.touched.confirmPwd && props.errors.confirmPwd}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={props.handleSubmit}>
                                <View style={styles.button}>
                                    <Text style={{
                                        color: 'white', fontSize: 20, textAlign: 'center', padding: 5
                                    }}>
                                        Submit</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>

            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 60,
        paddingTop: 30,
        marginVertical: 20
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
        paddingBottom: 20,
        textAlign: 'center'
    },
    input: {
        borderRadius: 1,
        borderColor: '#777',
        width: 300,
        borderWidth: 1,
        marginTop: 0,
        paddingLeft: 40,
        paddingRight: 40
    },
    button: {
        marginTop: 10,
        height: 40,
        width: 300,
        backgroundColor: '#2874F0',
        borderRadius: 5
    },
    error: {
        color: 'crimson',
        fontSize: 15
    }
})