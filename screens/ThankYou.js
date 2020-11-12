import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

export default function ThankYou() {
  const navigation = useNavigation();
  return (
    <View>
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
