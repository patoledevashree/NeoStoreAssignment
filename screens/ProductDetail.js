import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {Rating} from 'react-native-ratings';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-simple-toast';
import RatingModal from './modal/RatingModal';
import {connect} from 'react-redux';
import {getProductDetail} from '../redux/action/ProductAction';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {checkCart} from '../redux/action/CartAction';
import Share from 'react-native-share';
import {baseUrl} from '../shared/config';

/**
 * @author Devashree Patole
 * @description This screen contains the product details Here the user can
 *           buy product and also rate the product and can add product to cart
 * @param {object} route This object contains the data which is passed between screens
 *                       during navigation
 * @returns JSX of Product Detail screen
 */
function ProductDetail(props) {
  const product_id = props.route.params.data;

  useEffect(() => {
    props.getProductDetail(product_id);
  }, []);

  const productDetail = props.product;
  const [rate, setrating] = useState(false);
  const navigation = useNavigation();
  const [cartItem, setItem] = useState([]);
  console.log('ProductDetail', productDetail);
  const addCart = () => {
    props.checkCart(productDetail, props.cartData);
  };

  const closeModal = () => {
    setrating(false);
  };

  const shareProduct = async () => {
    const shareOptions = {
      message: `${baseUrl}/getProductByProdId/${product_id}`,
    };

    try {
      const ShareResponse = await Share.open(shareOptions);
    } catch (error) {
      // console.log('error', error);
    }
  };
  if (props.loading) {
    return (
      <LottieView
        source={require('../assests/images/4383-circle-loader.json')}
        autoPlay
        loop
      />
    );
  } else {
    return (
      <View>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.sliderContainer}>
              <Swiper>
                {props.product?.subImages_id?.product_subImages.map(
                  (item, index) => {
                    return (
                      <View key={index} style={styles.slide}>
                        <Image
                          source={{
                            uri: `${baseUrl}/${item}`,
                          }}
                          resizeMode="cover"
                          style={styles.sliderImage}
                        />
                      </View>
                    );
                  },
                )}
              </Swiper>
            </View>
          </View>
          <View style={{marginLeft: 20}}>
            <View>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: 'bold',
                }}>
                {productDetail.product_name}
              </Text>

              <Text
                style={{
                  fontSize: 18,
                }}>
                {productDetail.category_id?.category_name}
              </Text>

              <Text
                style={{
                  color: '#eb9800',
                  fontSize: 22,
                  fontWeight: 'bold',
                  marginTop: 5,
                }}>
                {'\u20B9'}
                {productDetail.product_cost}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  marginTop: 5,
                }}>
                <Rating
                  count={5}
                  startingValue={Number(productDetail.product_rating)}
                  imageSize={20}
                  readonly={true}
                  type={'custom'}
                  tintColor="white"
                />
              </View>

              <Text
                style={{
                  fontSize: 18,
                  marginTop: 5,
                }}>
                Product By: {productDetail.product_producer}
              </Text>
            </View>
            <FontAwesome
              name="share-alt"
              size={30}
              style={{
                position: 'absolute',
                right: 30,
                top: 35,
                height: 50,
                width: 50,
                borderWidth: 1,
                paddingLeft: 8,
                paddingTop: 10,
                borderRadius: 50,
              }}
              color={'#777'}
              onPress={() => {
                shareProduct();
              }}
            />
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                  marginTop: 7,
                }}>
                Description:
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  marginTop: 10,
                }}>
                {productDetail.product_desc}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  marginTop: 10,
                }}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>
                  Dimension :
                </Text>{' '}
                {productDetail.product_dimension}
              </Text>
            </View>
          </View>

          <View style={styles.icon}>
            <TouchableOpacity
              onPress={() => {
                if (productDetail.product_stock !== 0) {
                  addCart();
                } else {
                  Toast.show('Product Out Of Stock');
                }
              }}>
              <FontAwesome
                name="shopping-cart"
                size={30}
                color={'white'}
                style={{padding: 15}}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <View
              style={{flexDirection: 'row', marginTop: 10, marginBottom: 10}}>
              <View style={styles.button}>
                <Button
                  title="Shop Now"
                  onPress={() => {
                    navigation.navigate('OrderSummary', {
                      total: '',
                      product: productDetail,
                    });
                  }}
                />
              </View>
              <View style={styles.button}>
                <Button
                  title="Rate"
                  color={'#eb9800'}
                  onPress={() => {
                    props.userData.length === 0
                      ? navigation.navigate('Login')
                      : setrating(true);
                  }}
                />
              </View>
            </View>
          </View>
          <RatingModal
            visible={rate}
            closeModal={closeModal}
            token={props.userData?.data?.token}
            productId={productDetail.product_id}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.productReducer.productDetail,
    loading: state.productReducer.isLoading,
    userData: state.loginReducer.user,
    cartData: state.cartReducer.cartData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductDetail: (id) => dispatch(getProductDetail(id)),
    checkCart: (product, cartItem) => dispatch(checkCart(product, cartItem)),
  };
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  sliderContainer: {
    height: 200,
    width: '98%',
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    // marginBottom: 10
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  footer: {
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderTopColor: '#777',
    position: 'relative',
    shadowColor: '#777',
    justifyContent: 'space-around',
    marginTop: 22,
    borderTopWidth: 1,
  },
  button: {
    width: 150,
    height: 40,
    marginLeft: 35,
    borderRadius: 5,
  },
  icon: {
    borderRadius: 50,
    backgroundColor: '#2874F0',
    right: 20,
    height: 55,
    width: 55,
    position: 'absolute',
    bottom: 70,
    elevation: 9,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
