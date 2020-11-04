import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { login } from '../redux/action/LoginAction';

const validationSchema = yup.object({
    email: yup
        .string()
        .email()
        .required(),
    password: yup
        .string()
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .required()
        .matches('^[a-zA-Z0-9_]*$', 'Password can only contain alphanumeric.')
})

/**
 * @author Devashree Patole
 * @description This is  a Login Screen where user can login with username  and password.
 * @returns JSX of Login screen.
 */

function Login({ userData, login }) {
    const navigation = useNavigation();

    const [displayPassword, setPassword] = useState(true);
    const [eye_icon, setIcon] = useState('eye-slash')

    const handleClick = () => {
        setPassword(!displayPassword);
        if (eye_icon === 'eye-slash') {
            setIcon('eye')
        }
        else {
            setIcon('eye-slash')
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
                        email: '',
                        password: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, action) => {
                        console.log(values)
                        login(values)
                        navigation.navigate('Dashboard')
                        action.resetForm({
                            values: {
                                email: '',
                                password: ''
                            }
                        })
                    }}
                >
                    {
                        (props) => (
                            <View>

                                <View style={{ marginBottom: 5 }}>
                                    <FontAwesome style={{ position: 'relative', top: 35, left: 15 }}
                                        name='user' color='#777' size={20} />
                                    <TextInput style={styles.input}
                                        placeholder='Email'
                                        onChangeText={props.handleChange('email')}
                                        value={props.values.email}
                                        onBlur={props.handleBlur('email')}

                                    />
                                    {props.touched.email && props.errors.email && (
                                        <Text style={styles.error}>
                                            {props.touched.email && props.errors.email}
                                        </Text>
                                    )}

                                </View>
                                <View >
                                    <FontAwesome style={{ position: 'relative', top: 35, left: 15 }}
                                        name='lock' color='#777' size={20} />
                                    <TextInput style={styles.input}
                                        placeholder='Password'
                                        secureTextEntry={displayPassword}
                                        onChangeText={props.handleChange('password')}
                                        value={props.values.password}
                                        onBlur={props.handleBlur('password')}
                                    />
                                    <FontAwesome style={{ position: 'absolute', top: 35, right: 5 }}
                                        name={eye_icon} size={20}
                                        color='#777'
                                        onPress={handleClick}
                                    />
                                    {props.touched.password && props.errors.password && (
                                        <Text style={styles.error}>
                                            {props.touched.password && props.errors.password}
                                        </Text>
                                    )}
                                </View>
                                <TouchableOpacity onPress={props.handleSubmit}>
                                    <View style={styles.button}>
                                        <Text style={{
                                            color: 'white', fontSize: 20, textAlign: 'center', padding: 5
                                        }}>Login</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => { navigation.navigate('ForgetPassword') }} >
                                    <Text style={styles.underLineText}>Forget Password?</Text>
                                </TouchableOpacity>


                                <View style={{ marginTop: 30, flexDirection: 'row' }}>
                                    <View>
                                        <Text style={styles.textInput}>Don't Have an Account?</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => { navigation.navigate('Register') }}>
                                        <View>
                                            <FontAwesome style={styles.icon} name='plus' size={40} color={'white'} />
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        )
                    }
                </Formik>
            </View>
        </TouchableWithoutFeedback>
    )
}

const mapStateToProps = state => {
    return {
        userData: state.loginReducer.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (data) => dispatch(login(data))
    }
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
        marginTop: 0,
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
        fontSize: 20,
        textDecorationLine: 'underline',
        color: '#2874F0',
        fontWeight: 'bold',
        marginTop: 20
    },
    textInput: {
        fontSize: 20,
        color: '#777',
        fontWeight: 'bold',
    },
    icon: {
        backgroundColor: '#2874F0',
        left: 30,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    error: {
        color: 'crimson',
        fontSize: 15
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)