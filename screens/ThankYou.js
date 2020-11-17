import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {getOrders} from '../redux/action/CartAction';

/**
 * @author Devashree Patole
 * @description This screen is displayed when user placed order
 * @returns JSX of Thank You screen
 */
function ThankYou(props) {
  const navigation = useNavigation();
  useEffect(() => {
    if (props.userData.data.token) {
      props.getOrders(props.userData.data.token);
    }
  }, [props.userData]);

  return (
    <View style={{marginVertical: 50}}>
      <View style={{marginHorizontal: 50, marginTop: 50}}>
        <FontAwesome
          name="hands-helping"
          color={'#858585'}
          size={150}
          style={{paddingLeft: 40, paddingHorizontal: 20}}
        />
        <Text style={{fontSize: 30, fontWeight: 'bold', paddingTop: 20}}>
          Thank you for shipping with us.
        </Text>
      </View>
      <View style={{width: 300, paddingTop: 30, marginLeft: 50}}>
        <Button
          title="Buy More Products"
          onPress={() => {
            navigation.navigate('Dashboard');
          }}
        />
      </View>
    </View>
  );
}

export const mapStateToProps = (state) => {
  return {
    userData: state.loginReducer.user,
  };
};
export const mapDispatchToProps = (dispatch) => {
  return {
    getOrders: (token) => dispatch(getOrders(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThankYou);
