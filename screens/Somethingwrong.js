import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

/**
 * @author Devashree Patole
 * @description Ths screen is displayed when the port in the server changes PropTypes.
 * @returns JSX of default screen
 */
export default function Somethingwrong() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assests/images/oops.png')}
        style={styles.image}
      />
      <Text
        style={{
          marginTop: 30,
          fontSize: 30,
          fontWeight: 'bold',
          marginLeft: 30,
        }}>
        Something Went
      </Text>
      <Text
        style={{
          fontSize: 30,
          fontWeight: 'bold',
          marginLeft: 70,
        }}>
        Wrong !!!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: 300,
  },
  container: {
    flex: 1,
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
