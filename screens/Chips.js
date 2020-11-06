import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';


/**
 * @author Devashree Patole
 * @description This screen is to display the scelected category 
 *              or the color by the user to filter the list of product
 * @param {text} text the select category or color to display
 * @param {color} color the color selected
 * @param {function} clearFilter function to clear filter
 * @returns JSX of chips
 */
export default function Chips({ text, color, clearFilter }) {
    return (
        <View style={{
            width: 100,
            borderColor: color,
            borderWidth: 2,
            height: 50,
            borderRadius: 5,
            flexDirection: "row",
            justifyContent: 'space-between',
            marginVertical: 10,
            marginLeft: 10,
        }}>
            <Text style={{ textAlign: 'center', fontSize: 15, paddingVertical: 10, paddingLeft: 5 }}
            >{text}</Text>
            <TouchableOpacity onPress={() => { clearFilter() }}>
                <FontAwesome name='times' size={20} color={'#777'}
                    style={{ right: 5, top: 10, zIndex: 1 }}
                />
            </TouchableOpacity>
        </View>
    )
}