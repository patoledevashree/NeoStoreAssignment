import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TextInput,
    ImageBackground,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
import { color } from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { getDashboard, getTopRatedProduct } from '../redux/action/DashboardAction';

/**
 * @author Devashree Patole
 * @description This screen contains the top rated products,
 *              a search box and carousel of images.
 * @returns JSX of Dashboard
 */

function Dashboard({ categoryList, topRatedProduct, isLoading, getDashboard, getTopRatedProduct }) {
    const navigation = useNavigation();
    useEffect(() => {
        getDashboard()
        getTopRatedProduct()
    }, [])

    if (isLoading) {
        return (
            <LottieView
                source={require('../assests/images/4383-circle-loader.json')}
                autoPlay loop
            />
        )
    }
    else {
        return (
            <View style={{ marginBottom: 30 }}>
                {console.log('Dashboard Screen', categoryList)}
                <View style={styles.container}>
                    <View style={styles.search}>
                        <View>
                            <FontAwesome style={{ padding: 10, paddingLeft: 20 }}
                                name='search' size={20} color='#777' />
                        </View>
                        <View>
                            <TextInput style={styles.input}
                                placeholder='Search for Products'
                            />
                        </View>
                    </View>
                </View>
                <ScrollView>


                    <View style={styles.container}>
                        <View style={styles.sliderContainer}>
                            <Swiper autoplay>
                                {categoryList.map((item, index) => {
                                    return (
                                        <View key={index} style={styles.slide}>
                                            <TouchableOpacity>
                                                <Image
                                                    source={{
                                                        uri: `http://180.149.241.208:3022/${item.product_image}`
                                                    }}
                                                    resizeMode='cover'
                                                    style={styles.sliderImage}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })}
                            </Swiper>

                        </View>
                    </View>


                    <View>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 25,
                            padding: 10,
                            color: '#3b3b3b',
                            paddingTop: 20
                        }}>
                            Products
                </Text>
                        <TouchableOpacity onPress={() => { navigation.navigate('Product') }}>
                            <Text style={{
                                textAlign: 'center',
                                padding: 10,
                                fontSize: 18,
                                color: '#3b3b3b'
                            }}>
                                View All
                    </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ backgroundColor: '#e7e7e7', marginBottom: 40 }}>
                        {topRatedProduct.map((item, index) => {
                            return (
                                <View key={index} style={styles.cardWrapper}>
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate('ProductDetail',
                                            {
                                                data: item.DashboardProducts[0],
                                                product_name: item.DashboardProducts[0].product_name
                                            }
                                        )
                                    }}>
                                        <View style={styles.card}>
                                            <View style={styles.cardImgWrapper}>
                                                <ImageBackground
                                                    source={{
                                                        uri: `http://180.149.241.208:3022/${item.DashboardProducts[0].product_image}`
                                                    }}
                                                    resizeMode='cover'
                                                    style={styles.cardImg}
                                                >
                                                    <View style={styles.productView}>
                                                        <Text style={{
                                                            color: 'white',
                                                            textAlign: 'right',
                                                            fontSize: 20,
                                                            paddingRight: 20,
                                                            paddingTop: 30
                                                        }}>
                                                            {item.DashboardProducts[0].product_name}
                                                        </Text>
                                                        <Text style={{
                                                            color: 'white',
                                                            textAlign: 'right',
                                                            fontSize: 16,
                                                            paddingRight: 20,
                                                            paddingTop: 5
                                                        }}>
                                                            {'\u20B9'}{item.DashboardProducts[0].product_cost}
                                                        </Text>
                                                    </View>
                                                </ImageBackground>
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                </View>
                            )
                        })}

                    </View>
                </ScrollView>
            </View>

        )
    }
}

const mapStateToProps = state => {
    return {
        categoryList: state.dashboardReducer.categoryList,
        topRatedProduct: state.dashboardReducer.topRatedProduct,
        isLoading: state.dashboardReducer.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDashboard: () => dispatch(getDashboard()),
        getTopRatedProduct: () => dispatch(getTopRatedProduct())
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2874F0'
    },
    input: {
        width: 350,
        paddingLeft: 10,


    },
    search: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        marginBottom: 5,
        borderRadius: 5,
    },
    sliderContainer: {
        height: 200,
        width: '98%',
        marginTop: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        // marginBottom: 10
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 5
    },
    sliderImage: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 5
    },
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

})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)