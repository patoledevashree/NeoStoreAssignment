import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, Modal } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import StarRating from './StarRating';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import CategoryModal from './modal/CategoryModal';
import PriceModal from './modal/PriceModal';
import ColorModal from './modal/ColorModal';
import { AirbnbRating, Rating } from 'react-native-ratings';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

/**
 * @author Devashree Patole
 * @description This screen displayes the complete list of products.
 *              The Products can also be filtered based on category,price,color and rating
 * @returns JSX of Product Screen
 */

export default function Product() {

    const [detail, setDetail] = useState([
        {
            image: require('../assests/images/sofa.png'),
            title: 'Apollo Sofa',
            rating: 4,
            price: '43, 000',
        },
        {
            image: require('../assests/images/chair.png'),
            title: 'Apollo Sofa',
            rating: 4,
            price: '43, 000',
        },
        {
            image: require('../assests/images/bed.png'),
            title: ' Godrej Interio bed',
            rating: 4,
            price: '43, 000',
        },
        {
            image: require('../assests/images/almirah.png'),
            title: 'Apollo Sofa',
            rating: 4,
            price: '43, 000',
        },
        {
            image: require('../assests/images/sofa.png'),
            title: 'Apollo Sofa',
            rating: 4,
            price: '43, 000',
        },
        {
            image: require('../assests/images/bed.png'),
            title: ' Godrej Interio bed',
            rating: 4,
            price: '43, 000',
        },
        {
            image: require('../assests/images/sofa.png'),
            title: 'Apollo Sofa',
            rating: 4,
            price: '43, 000',
        },
        {
            image: require('../assests/images/chair.png'),
            title: 'Apollo Sofa',
            rating: 4,
            price: '43, 000',
        },
    ])

    const [categoryVisible, setCategory] = useState(false);
    const [priceVisible, setPrice] = useState(false);
    const [colorVisible, setColor] = useState(false)

    const closeModal = () => {
        setCategory(false);
        setPrice(false);
        setColor(false);
    }
    const [isLoading, setLoading] = useState(true);
    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 3000)
    })
    if (isLoading) {
        return <LottieView source={require('../assests/images/4383-circle-loader.json')} autoPlay loop />
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <View>
                    {
                        detail.map((item, index) => {
                            return (
                                <View key={index} style={{ backgroundColor: '#e7e7e7', marginBottom: 5, marginTop: 5 }}>
                                    <View style={styles.cardWrapper}>
                                        <TouchableOpacity onPress={()=>{navigation.navigate('ProductDetail')}}>
                                            <View style={styles.card}>
                                                <View style={styles.cardImgWrapper}>
                                                    <ImageBackground
                                                        source={item.image}
                                                        resizeMode='cover'
                                                        style={styles.cardImg}
                                                    >
                                                        <View style={styles.productView}>
                                                            <Text style={index % 2 == 0 ? styles.textHeadRight : styles.textHeadLeft}>
                                                                {item.title}
                                                            </Text>
                                                            <View style={index % 2 == 0 ? styles.rateRight : styles.rateLeft}>
                                                                <Rating
                                                                    count={5}
                                                                    startingValue={4.5}
                                                                    imageSize={20}
                                                                    readonly={true}
                                                                    showRating={false}
                                                                    tintColor="rgba( 0, 0, 0, 0.5 )"
                                                                    type={"custom"}
                                                                />
                                                            </View>
                                                            <Text style={index % 2 == 0 ? styles.textRight : styles.textLeft}>
                                                                {'\u20B9'}{item.price}
                                                            </Text>
                                                        </View>
                                                    </ImageBackground>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            )
                        })
                    }

                </View>
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => { setCategory(true) }}>
                    <View style={{ padding: 10 }}>
                        <FontAwesome name='list-alt' color={'black'} size={25} style={styles.icon} />
                        <Text style={{ fontWeight: 'bold' }}>Catogery</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setColor(true) }}>
                    <View style={{ padding: 10 }}>
                        <FontAwesome name='palette' color={'black'} size={25} style={styles.icon} />
                        <Text style={{ fontWeight: 'bold' }}>Color</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={{ padding: 10 }}>
                        <FontAwesome name='star' color={'black'} size={25} style={styles.icon} />
                        <Text style={{ fontWeight: 'bold' }}>Rating</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setPrice(true) }}>
                    <View style={{ padding: 10 }}>
                        <FontAwesome name='rupee-sign' color={'black'} size={25} style={styles.icon} />
                        <Text style={{ fontWeight: 'bold' }}>Price</Text>
                    </View>
                </TouchableOpacity>

            </View>
            <CategoryModal visible={categoryVisible} closeModal={closeModal} />
            <PriceModal visible={priceVisible} closeModal={closeModal} />
            <ColorModal visible={colorVisible} closeModal={closeModal} />
        </View>
    )
}

const styles = StyleSheet.create({
    cardWrapper: {
        width: '90%',
        alignSelf: 'center'
    },
    card: {
        marginTop: 10,
        height: 150,
        marginBottom: 20,
        flexDirection: 'row',
        shadowColor: '#777',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.6,
        shadowRadius: 2,
        elevation: 5,
        borderRadius: 5
    },
    cardImgWrapper: {
        flex: 1
    },
    cardImg: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,


    },
    productView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    footer: {
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        borderTopColor: '#777',
        position: 'relative',
        shadowColor: '#777',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#e7e7e7',
        borderTopWidth:1
    },
    textHeadLeft: {
        color: 'white',
        fontSize: 20,
        paddingLeft: 20,
        paddingTop: 30
    },
    textLeft: {
        color: 'white',
        fontSize: 16,
        paddingLeft: 20,
        paddingTop: 5
    },
    rateLeft: {
        paddingLeft: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    rateRight: {
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    textHeadRight: {
        color: 'white',
        fontSize: 20,
        textAlign: 'right',
        paddingRight: 20,
        paddingTop: 30
    },
    textRight: {
        color: 'white',
        fontSize: 16,
        paddingRight: 20,
        textAlign: 'right',
        paddingTop: 5
    },
    icon: {
        paddingLeft: 10
    },
    modalStyle: {
        backgroundColor: 'white',
        margin: 50,
        padding: 40,
        // flex:1,
        borderRadius: 10
    }

})