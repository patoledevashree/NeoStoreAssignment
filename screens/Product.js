import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, Modal, FlatList } from 'react-native';
import StarRating from './StarRating';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import CategoryModal from './modal/CategoryModal';
import PriceModal from './modal/PriceModal';
import ColorModal from './modal/ColorModal';
import { AirbnbRating, Rating } from 'react-native-ratings';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { getCategories, getColors } from '../redux/action/ProductAction';
import axios from 'axios'

/**
 * @author Devashree Patole
 * @description This screen displayes the complete list of products.
 *              The Products can also be filtered based on category,price,color and rating
 * @returns JSX of Product Screen
 */

function Product(props) {
    useEffect(() => {
        console.log('UseEffect')
        props.getCategories();
        props.getColors();
        getProducts();
      
    }, [])

    const navigation = useNavigation();
    const [categoryVisible, setCategory] = useState(false);
    const [priceVisible, setPrice] = useState(false);
    const [colorVisible, setColor] = useState(false)
    const [selectedCategory, setSelectCategory] = useState('')
    const [selectedColor, setSelectedColor] = useState('')
    const [isLoading,setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [displayProduct,setDisplay] = useState([]);
    const [productList,setProduct] = useState({})
   
    const category = props.categoryList;
    const getProducts = () => {
        console.log('apicall')
        axios.get('http://180.149.241.208:3022/commonProducts')
            .then(response => {
                console.log(response)
                setProduct(response.data) 
                setDisplay(response.data.product_details.slice(0,5))
                setLoading(false)
            })
            .catch(error => {
                console.log(error.response.data)
                setLoading(false)
            })
    }

    const handleLoadMore = () => {
       let start= page *5;
       let end = (page + 1 )*5;
       if(end > productList.product_details.length){
           end = productList.product_details.length;
       }
       const productData = productList.product_details.slice(start,end)
       setDisplay((prevState)=>{
                return [...prevState,...productData]
       })
       setPage((prev)=>{
           return prev+1
       })
    }

    // const handleLoader = () => {
    //     console.log('Loading')
    // }

    const selectCategory = (val) => {
        setSelectCategory(val)
        console.log(selectedCategory)
    }

    const selectColor = (color) => {
        setSelectedColor(color)
        console.log(selectedColor)
    }
    const closeModal = () => {
        setCategory(false);
        setPrice(false);
        setColor(false);
    }


    if (isLoading) {
        return <LottieView source={require('../assests/images/4383-circle-loader.json')} autoPlay loop />
    }
    else {
        return (
            <View style={{ flex: 1 }}>
               {console.log(productList)}
                <FlatList
                    data={displayProduct}
                    keyExtractor={(item) => {
                        return  item._id
                    }}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={1}
                    // ListFooterComponent={handleLoader}
                    renderItem={({ item, index }) => (
                        <View style={{ backgroundColor: '#e7e7e7', marginBottom: 5, marginTop: 5 }}>
                            <View style={styles.cardWrapper}>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('ProductDetail', {
                                        data: item.product_id,
                                        product_name: item.product_name
                                    })
                                }}>
                                    <View style={styles.card}>
                                        <View style={styles.cardImgWrapper}>
                                            <ImageBackground
                                                source={{
                                                    uri: `http://180.149.241.208:3022/${item.product_image}`
                                                }}
                                                resizeMode='cover'
                                                style={styles.cardImg}
                                            >
                                                <View style={styles.productView}>
                                                    <Text style={index % 2 == 0 ? styles.textHeadRight : styles.textHeadLeft}>
                                                        {item.product_name}
                                                    </Text>
                                                    <View style={index % 2 == 0 ? styles.rateRight : styles.rateLeft}>
                                                        <Rating
                                                            count={5}
                                                            startingValue={Number(item.product_rating)}
                                                            imageSize={20}
                                                            readonly={true}
                                                            showRating={false}
                                                            tintColor="rgba( 0, 0, 0, 0.5 )"
                                                            type={"custom"}
                                                        />
                                                    </View>
                                                    <Text style={index % 2 == 0 ? styles.textRight : styles.textLeft}>
                                                        {'\u20B9'}{item.product_cost}
                                                    </Text>
                                                </View>
                                            </ImageBackground>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                    )}
                />
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
                <CategoryModal
                    visible={categoryVisible}
                    closeModal={closeModal}
                    selectCategory={selectCategory}
                    categoryList={category.length > 0 ? category : []} />
                <PriceModal visible={priceVisible} closeModal={closeModal} />
                <ColorModal
                    visible={colorVisible}
                    closeModal={closeModal}
                    selectColor={selectColor}
                    colorsList={props.colors}
                />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        categoryList: state.productReducer.category,
        colors: state.productReducer.colors,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCategories: () => dispatch(getCategories()),
        getColors: () => dispatch(getColors()),
    }
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
        borderTopWidth: 1
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

export default connect(mapStateToProps, mapDispatchToProps)(Product)