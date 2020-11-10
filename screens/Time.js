import React from 'react';
import {View, Text} from 'react-native';
import moment from 'moment';

export default function Time({time}) {
  const date = moment(time).format('MMMM D, YYYY');
  return (
    <View>
      <Text
        style={{
          fontSize: 15,
          paddingLeft: 30,
          paddingTop: 20,
          paddingBottom: 20,
        }}>
        Placed Order On: {date}
      </Text>
    </View>
  );
}
