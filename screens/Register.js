import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import RadioForm from 'react-native-simple-radio-button';
import { useNavigation } from '@react-navigation/native';

const validationSchema = yup.object({
    FirstName: yup
        .string()
        .min(4)
        .required(),
    LastName: yup
        .string()
        .min(4)
        .required(),
    Email: yup
        .string()
        .email()
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
        ),
    Phone: yup
        .string()
        .required(),
    // .matches('/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/'
    //     , 'Phone number is not valid')
    Gender: yup
        .string()
        .required()
})

var radio_props = [
    { label: 'Male', value: 0 },
    { label: 'Female', value: 1 }
];

/**
 * @author Devashree Patole
 * @description This screen for Registration purposePropTypes.
 * @returns JSX of the Register screen
 */

export default function Register() {
    const [securePwd, setPassword] = useState(true);
    const [secureCrfm, setCfrmPwd] = useState(true);
    const [pwd_eyeStyle, setPwdIcon] = useState('eye-slash');
    const [crf_eyeStyle, setCrfmIcon] = useState('eye-slash');

    const navigation = useNavigation();

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
        <ScrollView>
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss();
            }}>
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={styles.text}>
                            Neo<Text style={{ color: '#2874F0' }}>Store</Text>
                        </Text>
                        <Formik
                            initialValues={{
                                FirstName: '',
                                LastName: '',
                                Email: '',
                                password: '',
                                confirmPwd: '',
                                Phone: '',
                                Gender: ''
                            }}
                            validationSchema={validationSchema}
                            onSubmit={values => {
                                console.log(values)
                            }}
                        >
                            {
                                (props) => (
                                    <View>

                                        <View>
                                            <FontAwesome style={{ position: 'relative', top: 35, left: 15 }}
                                                name='user' size={20} color='#777'
                                            />
                                            <TextInput style={styles.input}
                                                placeholder='FirstName'
                                                onChangeText={props.handleChange('FirstName')}
                                                value={props.values.FirstName}
                                                onBlur={props.handleBlur('FirstName')}

                                            />
                                            <Text style={styles.error}>
                                                {props.touched.FirstName && props.errors.FirstName}
                                            </Text>

                                        </View>
                                        <View>
                                            <FontAwesome style={{ position: 'relative', top: 35, left: 15 }}
                                                name='user' size={20} color='#777'
                                            />
                                            <TextInput style={styles.input}
                                                placeholder='LastName'
                                                onChangeText={props.handleChange('LastName')}
                                                value={props.values.LastName}
                                                onBlur={props.handleBlur('LastName')}

                                            />
                                            <Text style={styles.error}>
                                                {props.touched.LastName && props.errors.LastName}
                                            </Text>

                                        </View>

                                        <View>
                                            <FontAwesome style={{ position: 'relative', top: 35, left: 15 }}
                                                name='envelope' size={20} color='#777'
                                            />
                                            <TextInput style={styles.input}
                                                placeholder='Email'
                                                onChangeText={props.handleChange('Email')}
                                                value={props.values.Email}
                                                onBlur={props.handleBlur('Email')}

                                            />
                                            <Text style={styles.error}>
                                                {props.touched.Email && props.errors.Email}
                                            </Text>

                                        </View>

                                        <View >
                                            <FontAwesome style={{ position: 'relative', top: 35, left: 15 }}
                                                name='lock' size={20} color='#777'
                                            />
                                            <TextInput style={styles.input}
                                                placeholder='Password'
                                                secureTextEntry={securePwd}
                                                onChangeText={props.handleChange('password')}
                                                value={props.values.password}
                                                onBlur={props.handleBlur('password')}
                                            />
                                            <FontAwesome style={{ position: 'absolute', top: 35, right: 5 }}
                                                name={pwd_eyeStyle} size={20} color='#777'
                                                onPress={handlePwdClick} />
                                            <Text style={styles.error}>
                                                {props.touched.password && props.errors.password}
                                            </Text>
                                        </View>

                                        <View >
                                            <FontAwesome style={{ position: 'relative', top: 35, left: 15 }}
                                                name='lock' size={20} color='#777'
                                            />
                                            <TextInput style={styles.input}
                                                placeholder='Confirm Password'
                                                secureTextEntry={secureCrfm}
                                                onChangeText={props.handleChange('confirmPwd')}
                                                value={props.values.confirmPwd}
                                                onBlur={props.handleBlur('confirmPwd')}
                                            />
                                            <FontAwesome style={{ position: 'absolute', top: 35, right: 5 }}
                                                name={crf_eyeStyle} size={20} color='#777'
                                                onPress={handleClick} />
                                            <Text style={styles.error}>
                                                {props.touched.confirmPwd && props.errors.confirmPwd}
                                            </Text>
                                        </View>

                                        <View>
                                            <FontAwesome style={{ position: 'relative', top: 35, left: 15 }}
                                                name='user' size={20} color='#777'
                                            />
                                            <TextInput style={styles.input}
                                                keyboardType={"numeric"}
                                                placeholder='Phone Number'
                                                onChangeText={props.handleChange('Phone')}
                                                value={props.values.Phone}
                                                onBlur={props.handleBlur('Phone')}

                                            />
                                            <Text style={styles.error}>
                                                {props.touched.Phone && props.errors.Phone}
                                            </Text>

                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ paddingRight: 10, fontSize: 18 }}>Gender</Text>
                                            <RadioForm
                                                radio_props={radio_props}
                                                initial={-1}
                                                formHorizontal={true}
                                                buttonColor={'#2874F0'}
                                                onPress={(val) => {
                                                    if (val === 0) {
                                                        props.setFieldValue('Gender', 'Male');
                                                    }
                                                    else {
                                                        props.setFieldValue('Gender', 'Female');
                                                    }
                                                }}
                                                selectedButtonColor={'#2874F0'}
                                                labelStyle={{ fontSize: 15, paddingRight: 10 }}

                                            />

                                        </View>

                                        <TouchableOpacity onPress={props.handleSubmit}>
                                            <View style={styles.button}>
                                                <Text style={{
                                                    color: 'white', fontSize: 20, textAlign: 'center', padding: 5
                                                }}>Register</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{flexDirection:'row',marginLeft:10,marginTop:10}}>
                                            <View>
                                                <Text>Already have an Account?</Text>
                                            </View>
                                            <TouchableOpacity onPress={()=>{navigation.navigate('Login')}}>
                                                <View>
                                                    <Text style={styles.underLineText}>SignIn</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                )
                            }
                        </Formik>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 60,
        paddingTop: 30,
        marginVertical: 20
    },
    input: {
        borderRadius: 1,
        borderColor: '#777',
        width: 300,
        borderWidth: 1,

        paddingLeft: 40,
        paddingRight: 40
    },
    button: {
        marginTop: 20,
        height: 40,
        width: 300,
        backgroundColor: '#2874F0',
        borderRadius: 5
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
        paddingBottom: 20,
        textAlign: 'center'
    },
    underLineText: {
        fontSize: 18,
        textDecorationLine: 'underline',
        color: '#2874F0',
        fontWeight: 'bold',
        paddingLeft:10
       
    },
    textInput: {
        fontSize: 20,
        color: '#777',
        fontWeight: 'bold',
    },
    icon: {
        backgroundColor: '#d1ad88',
        left: 40
    },
    error: {
        color: 'crimson',
        fontSize: 15
    }
})