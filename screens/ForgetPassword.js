import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import axois from 'axios';
import Toast from 'react-native-simple-toast';
import LottieView from 'lottie-react-native';
import {baseUrl} from '../shared/config';

const validationschema = yup.object({
  email: yup.string().email().required(),
});
/**
 * @author Devashree Patole
 * @description This screen allow the user to enter userId to
 *              get the otp to reset password
 * @returns jsx of the forget password screen
 */

export default function ForgetPassword() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <LottieView
        source={require('../assests/images/4383-circle-loader.json')}
        autoPlay
        loop
      />
    );
  } else {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={styles.container}>
          <Text style={styles.text}>
            Neo<Text style={{color: '#2874F0'}}>Store</Text>
          </Text>
          <Formik
            initialValues={{email: ''}}
            validationSchema={validationschema}
            onSubmit={(values) => {
              setLoading(true);
              axois
                .post(`${baseUrl}/forgotPassword`, {
                  email: values.email,
                })
                .then((response) => {
                  const data = response.data;
                  Toast.show(response.data.message);
                  navigation.navigate('SetPassword', {token: data.token});
                  setLoading(false);
                })
                .catch((error) => {
                  setLoading(false);
                  Toast.show(error.response.data.message);
                });
            }}>
            {(props) => (
              <View>
                <Text style={{fontSize: 20, marginTop: 10, color: '#2874F0'}}>
                  Forgot Password?
                </Text>

                <FontAwesome
                  style={{position: 'relative', top: 35, left: 15}}
                  name="user"
                  size={20}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Enter Email"
                  onChangeText={props.handleChange('email')}
                  value={props.values.email}
                  onBlur={props.handleBlur('email')}
                />
                <Text style={styles.error}>
                  {props.touched.email && props.errors.email}
                </Text>
                <TouchableOpacity onPress={props.handleSubmit}>
                  <View style={styles.button}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 20,
                        textAlign: 'center',
                        padding: 5,
                      }}>
                      Submit
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    paddingBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderRadius: 1,
    borderColor: '#777',
    width: 300,
    borderWidth: 1,
    marginTop: 0,
    paddingLeft: 40,
    paddingRight: 40,
  },
  button: {
    marginTop: 10,
    height: 40,
    width: 300,
    backgroundColor: '#2874F0',
    borderRadius: 5,
  },
  error: {
    color: 'crimson',
    fontSize: 15,
  },
});
