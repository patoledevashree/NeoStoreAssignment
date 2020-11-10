import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Swiper from 'react-native-swiper';
import {color} from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {
  getDashboard,
  getTopRatedProduct,
} from '../redux/action/DashboardAction';
import {restoreData} from '../redux/action/LoginAction';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {getCartData} from '../redux/action/CartAction';

/**
 * @author Devashree Patole
 * @description This screen contains the top rated products,
 *              a search box and carousel of images.
 * @returns JSX of Dashboard
 */

let timeOutId;

const debounce = (func, delay) => {
  return ({...args}) => {
    if (timeOutId) clearTimeout(timeOutId);
    timeOutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

function Dashboard(props) {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [searchResult, setResult] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    props.getDashboard();
    props.getTopRatedProduct();
    restoteUserData();
  }, []);

  const restoteUserData = async () => {
    const user = await AsyncStorage.getItem('user');
    const parseData = await JSON.parse(user);
    if (user !== null) {
      props.restoreData(parseData);
      console.log('parsedata', parseData);
      props.getCartData(parseData.data.token);
    }
  };

  const handleChange = (val) => {
    setQuery(val);
    debounceSearch();
  };

  const handleSearch = () => {
    axios
      .get(`http://180.149.241.208:3022/getProductBySearchText/${query}`)
      .then((response) => {
        const data = response.data.product_details;
        if (data === 'No details are available') {
          setResult([]);
        } else {
          setResult(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error search', error, error.data);
      });
  };

  const debounceSearch = debounce(handleSearch, 1000);

  if (props.isLoading) {
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
        <View style={{marginBottom: 30}}>
          <View style={styles.container}>
            <View style={styles.search}>
              <View>
                <FontAwesome
                  style={{padding: 10, paddingLeft: 20}}
                  name="search"
                  size={20}
                  color="#777"
                />
              </View>
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Search for Products"
                  onChangeText={(val) => {
                    handleChange(val);
                  }}
                />
              </View>
            </View>
          </View>
          <ScrollView>
            {query.length == 0 ? (
              <View>
                <View style={styles.container}>
                  <View style={styles.sliderContainer}>
                    <Swiper autoplay>
                      {props.categoryList.map((item, index) => {
                        return (
                          <View key={index} style={styles.slide}>
                            <TouchableOpacity
                              onPress={() => {
                                navigation.navigate('Product', {
                                  productId: item,
                                });
                              }}>
                              <Image
                                source={{
                                  uri: `http://180.149.241.208:3022/${item.product_image}`,
                                }}
                                resizeMode="cover"
                                style={styles.sliderImage}
                              />
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </Swiper>
                  </View>
                </View>

                <View>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 25,
                      padding: 10,
                      color: '#3b3b3b',
                      paddingTop: 20,
                    }}>
                    Products
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Product');
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        padding: 10,
                        fontSize: 18,
                        color: '#3b3b3b',
                      }}>
                      View All
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{backgroundColor: '#e7e7e7', marginBottom: 40}}>
                  {props.topRatedProduct.map((item, index) => {
                    return (
                      <View key={index} style={styles.cardWrapper}>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('ProductDetail', {
                              data: item.DashboardProducts[0].product_id,
                              product_name:
                                item.DashboardProducts[0].product_name,
                            });
                          }}>
                          <View style={styles.card}>
                            <View style={styles.cardImgWrapper}>
                              <ImageBackground
                                source={{
                                  uri: `http://180.149.241.208:3022/${item.DashboardProducts[0].product_image}`,
                                }}
                                resizeMode="cover"
                                style={styles.cardImg}>
                                <View style={styles.productView}>
                                  <Text
                                    style={{
                                      color: 'white',
                                      textAlign: 'right',
                                      fontSize: 20,
                                      paddingRight: 20,
                                      paddingTop: 30,
                                    }}>
                                    {item.DashboardProducts[0].product_name}
                                  </Text>
                                  <Text
                                    style={{
                                      color: 'white',
                                      textAlign: 'right',
                                      fontSize: 16,
                                      paddingRight: 20,
                                      paddingTop: 5,
                                    }}>
                                    {'\u20B9'}
                                    {item.DashboardProducts[0].product_cost}
                                  </Text>
                                </View>
                              </ImageBackground>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              </View>
            ) : (
              <View>
                {loading === true ? (
                  <View style={{justifyContent: 'center', marginVertical: 20}}>
                    <ActivityIndicator size={'large'} color={'blue'} />
                  </View>
                ) : (
                  <View>
                    {searchResult.length != 0 ? (
                      <View>
                        {searchResult.map((item, index) => {
                          return (
                            <ScrollView>
                              <TouchableOpacity
                                onPress={() => {
                                  navigation.navigate('ProductDetail', {
                                    data: item.product_id,
                                    product_name: item.product_name,
                                  });
                                }}>
                                <View
                                  key={index}
                                  style={{
                                    borderBottomWidth: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                  }}>
                                  <Text
                                    style={{
                                      padding: 15,
                                      fontSize: 20,
                                    }}>
                                    {item.product_name}
                                  </Text>
                                  <FontAwesome
                                    name="external-link-alt"
                                    size={25}
                                    color={'#777'}
                                    style={{
                                      right: 20,
                                      top: 15,
                                    }}
                                  />
                                </View>
                              </TouchableOpacity>
                            </ScrollView>
                          );
                        })}
                      </View>
                    ) : (
                      <View style={{marginVertical: 20}}>
                        <FontAwesome
                          name="frown-open"
                          size={200}
                          color={'#e7e7e7'}
                          style={{
                            marginHorizontal: 100,
                            marginVertical: 10,
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 35,
                            color: '#777',
                            textAlign: 'center',
                          }}>
                          No data found!!
                        </Text>
                      </View>
                    )}
                  </View>
                )}
              </View>
            )}
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categoryList: state.dashboardReducer.categoryList,
    topRatedProduct: state.dashboardReducer.topRatedProduct,
    isLoading: state.dashboardReducer.isLoading,
    userData: state.loginReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDashboard: () => dispatch(getDashboard()),
    getTopRatedProduct: () => dispatch(getTopRatedProduct()),
    restoreData: (userData) => dispatch(restoreData(userData)),
    getCartData: (token) => dispatch(getCartData(token)),
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2874F0',
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
    borderRadius: 5,
  },
  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 5,
  },
  cardWrapper: {
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    marginTop: 10,
    height: 150,
    marginBottom: 20,
    flexDirection: 'row',
    shadowColor: '#777',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 5,
  },
  cardImgWrapper: {
    flex: 1,
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
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
