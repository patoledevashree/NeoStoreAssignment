import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {Formik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import {useNavigation} from '@react-navigation/native';

/**
 * @author Devashree Patole
 * @description This screen is for the user to change the existing password
 *              user requires the old password and then a new password
 * @param {object} route this contain the data which is shared between screens during navigation
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
    .oneOf([yup.ref('newPwd'), null], 'Passwords must match'),
});

export default function ChangePassword({route}) {
  const navigation = useNavigation();
  const [securePwd, setPassword] = useState(true);
  const [secureCrfm, setCfrmPwd] = useState(true);
  const [secureOldPwd, setOldPwd] = useState(true);
  const [pwd_eyeStyle, setPwdIcon] = useState('eye-slash');
  const [crf_eyeStyle, setCrfmIcon] = useState('eye-slash');
  const [old_eyeStyle, setOldIcon] = useState('eye-slash');

  const handlePwdClick = () => {
    setPassword(!securePwd);
    if (pwd_eyeStyle === 'eye-slash') {
      setPwdIcon('eye');
    } else {
      setPwdIcon('eye-slash');
    }
  };

  const handleClick = () => {
    setCfrmPwd(!secureCrfm);
    if (crf_eyeStyle === 'eye-slash') {
      setCrfmIcon('eye');
    } else {
      setCrfmIcon('eye-slash');
    }
  };

  const handleOldClick = () => {
    setOldPwd(!secureOldPwd);
    if (old_eyeStyle === 'eye-slash') {
      setOldIcon('eye');
    } else {
      setOldIcon('eye-slash');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Formik
          initialValues={{
            oldPwd: '',
            newPwd: '',
            crfmPwd: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            axios
              .post(
                'http://180.149.241.208:3022/changePassword',
                {
                  oldPass: values.oldPwd,
                  newPass: values.newPwd,
                  confirmPass: values.crfmPwd,
                },
                {headers: {Authorization: `bearer ${route.params.token}`}},
              )
              .then((response) => {
                Toast.show(response.data.message);
                navigation.goBack();
              })
              .catch((error) => {
                Toast.show(error.response.data.message);
              });
          }}>
          {(props) => (
            <View style={{marginTop: 30}}>
              <View>
                <FontAwesome
                  name="key"
                  size={25}
                  color={'#777'}
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  secureTextEntry={secureOldPwd}
                  placeholder="Current Password"
                  onChangeText={props.handleChange('oldPwd')}
                  value={props.values.oldPwd}
                  onBlur={props.handleBlur('oldPwd')}
                />
                <FontAwesome
                  style={{position: 'absolute', top: 40, right: 20}}
                  name={old_eyeStyle}
                  size={20}
                  onPress={handleOldClick}
                />
                {props.touched.oldPwd && props.errors.oldPwd && (
                  <Text style={styles.error}>
                    {props.touched.oldPwd && props.errors.oldPwd}
                  </Text>
                )}
              </View>

              <View>
                <FontAwesome
                  name="key"
                  size={25}
                  color={'#777'}
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  secureTextEntry={securePwd}
                  placeholder="New Password"
                  onChangeText={props.handleChange('newPwd')}
                  value={props.values.newPwd}
                  onBlur={props.handleBlur('newPwd')}
                />
                <FontAwesome
                  style={{position: 'absolute', top: 40, right: 20}}
                  name={pwd_eyeStyle}
                  size={20}
                  onPress={handlePwdClick}
                />
                {props.touched.newPwd && props.errors.newPwd && (
                  <Text style={styles.error}>
                    {props.touched.newPwd && props.errors.newPwd}
                  </Text>
                )}
              </View>

              <View>
                <FontAwesome
                  name="key"
                  size={25}
                  color={'#777'}
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  secureTextEntry={secureCrfm}
                  placeholder="Confirm Password"
                  onChangeText={props.handleChange('crfmPwd')}
                  value={props.values.crfmPwd}
                  onBlur={props.handleBlur('crfmPwd')}
                />
                <FontAwesome
                  style={{position: 'absolute', top: 40, right: 20}}
                  name={crf_eyeStyle}
                  size={20}
                  onPress={handleClick}
                />
                {props.touched.crfmPwd && props.errors.crfmPwd && (
                  <Text style={styles.error}>
                    {props.touched.crfmPwd && props.errors.crfmPwd}
                  </Text>
                )}
              </View>

              <View style={{borderRadius: 10, marginTop: 20, width: 300}}>
                <Button
                  title="Change Password"
                  color={'#2874F0'}
                  onPress={props.handleSubmit}
                />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginHorizontal: 50,
  },
  input: {
    width: 300,
    borderWidth: 1,
    paddingLeft: 50,
  },
  icon: {
    top: 35,
    left: 15,
    position: 'relative',
  },
  error: {
    color: 'crimson',
    fontSize: 15,
  },
});
