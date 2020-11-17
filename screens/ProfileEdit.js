import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import {Formik} from 'formik';
import RadioForm from 'react-native-simple-radio-button';
import * as yup from 'yup';
import {connect} from 'react-redux';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {updateUser} from '../redux/action/LoginAction';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import LottieView from 'lottie-react-native';
import {baseUrl} from '../shared/config';
import Somethingwrong from './Somethingwrong';

/**
 * @author Devashree Patole
 * @description This screen is for the user to edit the profile here user can change the profile image
 *              first name, last name, gender,email, phone no
 * @param {object} props this contains the userdata which is present in the reducer
 * @returns JSX of Profile Edit screen
 */

var radio_props = [
  {label: 'male', value: 0},
  {label: 'female', value: 1},
];

const validationSchema = yup.object({
  firstName: yup.string().min(4).required(),
  lastName: yup.string().min(4).required(),
  email: yup.string().email().required(),
  phoneNo: yup.string().max(10).min(10).required(),
  gender: yup.string().required(),
});

function ProfileEdit(props) {
  const [photo, setPhoto] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const user = props.userData.data.customer_details;
  const handelPhoto = () => {
    const options = {};
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        setPhoto(response);
      }
    });
  };

  const handleChange = (event, selectedDate, formikProps) => {
    setShow(false);
    const currentDate = selectedDate || date;
    const newDate = moment(currentDate).format('L');
    setDate(currentDate);
    formikProps.setFieldValue('dob', newDate);
  };
  const showDatepicker = () => {
    setShow(true);
  };

  if (props.error) {
    return <Somethingwrong />;
  }

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
        <ScrollView>
          <View style={styles.container}>
            <View style={{marginTop: 20, marginHorizontal: 80}}>
              <TouchableOpacity
                onPress={() => {
                  handelPhoto();
                }}>
                <View>
                  {!photo.uri ? (
                    <Image
                      style={{
                        height: 100,
                        width: 100,
                        borderRadius: 50,
                      }}
                      source={
                        user.profile_img
                          ? {
                              uri: `${baseUrl}/${user.profile_img}`,
                            }
                          : require('../assests/images/avtar.png')
                      }
                    />
                  ) : (
                    <Avatar.Image
                      source={{
                        uri: photo.uri,
                      }}
                      rounded
                      size={100}
                    />
                  )}
                  <Text
                    style={{
                      color: '#2874F0',
                      fontSize: 20,
                      paddingTop: 10,
                    }}>
                    Change Photo
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <Formik
              initialValues={{
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                phoneNo: user.phone_no,
                gender: user.gender,
                dob: user.dob ? user.dob : '24/03/2013',
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                var formData = new FormData();
                if (photo.data) {
                  const image = 'data:image/jpeg;base64,' + photo.data;
                  formData.append('profile_img', image);
                }
                formData.append('first_name', values.firstName);
                formData.append('last_name', values.lastName);
                formData.append('email', values.email);
                formData.append('dob', values.dob);
                formData.append('phone_no', values.phoneNo);
                formData.append('gender', values.gender);
                if (!photo.data) {
                  Alert.alert('Plese Select profile photo');
                } else {
                  setLoading(true);
                  axios
                    .put(`${baseUrl}/profile`, formData, {
                      headers: {
                        Authorization: `bearer ${props.userData.data.token}`,
                      },
                    })
                    .then((response) => {
                      // console.log('response', response);
                      setLoading(false);
                      props.updateUser(response.data.customer_details);
                      navigation.goBack();
                    })
                    .catch((error) => {
                      // console.log('error', error.response);
                      setLoading(false);
                    });
                }
              }}>
              {(formikProps) => (
                <View style={styles.form}>
                  <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    onChangeText={formikProps.handleChange('firstName')}
                    value={formikProps.values.firstName}
                    onBlur={formikProps.handleBlur('firstName')}
                  />
                  <Text style={styles.error}>
                    {formikProps.touched.firstName &&
                      formikProps.errors.firstName}
                  </Text>

                  <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    onChangeText={formikProps.handleChange('lastName')}
                    value={formikProps.values.lastName}
                    onBlur={formikProps.handleBlur('lastName')}
                  />
                  <Text style={styles.error}>
                    {formikProps.touched.lastName &&
                      formikProps.errors.lastName}
                  </Text>

                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    editable={false}
                    onChangeText={formikProps.handleChange('email')}
                    value={formikProps.values.email}
                    onBlur={formikProps.handleBlur('email')}
                  />
                  <Text style={styles.error}>
                    {formikProps.touched.email && formikProps.errors.email}
                  </Text>

                  <TextInput
                    style={styles.input}
                    placeholder="Phone No"
                    onChangeText={formikProps.handleChange('phoneNo')}
                    value={formikProps.values.phoneNo}
                    onBlur={formikProps.handleBlur('phoneNo')}
                  />
                  <Text style={styles.error}>
                    {formikProps.touched.phoneNo && formikProps.errors.phoneNo}
                  </Text>

                  <View style={{flexDirection: 'row'}}>
                    <TextInput
                      style={styles.input}
                      placeholder="Date of Birth"
                      // onChangeText={formikProps.handleChange('phoneNo')}
                      value={formikProps.values.dob}
                      // onBlur={formikProps.handleBlur('phoneNo')}
                    />
                    <FontAwesome
                      style={{
                        position: 'absolute',
                        top: 10,
                        right: 15,
                        zIndex: 1,
                      }}
                      name="calendar-alt"
                      color="black"
                      size={25}
                      onPress={() => {
                        showDatepicker();
                      }}
                    />
                    {show && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={'date'}
                        display="default"
                        onChange={(event, selectedDate) => {
                          handleChange(event, selectedDate, formikProps);
                        }}
                      />
                    )}
                  </View>
                  <View style={{flexDirection: 'row', marginTop: 10}}>
                    <Text style={{paddingRight: 10, fontSize: 18}}>Gender</Text>
                    <RadioForm
                      radio_props={radio_props}
                      initial={1}
                      formHorizontal={true}
                      buttonColor={'#2874F0'}
                      onPress={(val) => {
                        if (val === 0) {
                          formikProps.setFieldValue('gender', 'Male');
                        } else {
                          formikProps.setFieldValue('gender', 'Female');
                        }
                      }}
                      selectedButtonColor={'#2874F0'}
                      labelStyle={{fontSize: 15, paddingRight: 10}}
                    />
                  </View>

                  <View style={{borderRadius: 10, marginTop: 20, width: 300}}>
                    <Button
                      title="Update"
                      color={'#2874F0'}
                      onPress={formikProps.handleSubmit}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.loginReducer.user,
    error: state.dashboardReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
  };
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    // marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  form: {
    // marginHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    borderBottomWidth: 1,
    width: 300,
  },
  error: {
    color: 'crimson',
    fontSize: 15,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
