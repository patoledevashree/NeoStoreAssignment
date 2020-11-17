import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import StarRating from './StarRating';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import CategoryModal from './modal/CategoryModal';
import PriceModal from './modal/PriceModal';
import ColorModal from './modal/ColorModal';
import {AirbnbRating, Rating} from 'react-native-ratings';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {getCategories, getColors} from '../redux/action/ProductAction';
import axios from 'axios';
import Chips from './Chips';
import {baseUrl} from '../shared/config';
import Somethingwrong from './Somethingwrong';
import {cardStyles} from '../shared/Styles/cardStyle';

/**
 * @author Devashree Patole
 * @description This screen displayes the complete list of products.
 *              The Products can also be filtered based on category,price,color and rating
 * @param {object} props this object contains the functions to be called in reducer
 * @returns JSX of Product Screen
 */

function Product(props) {
  useEffect(() => {
    props.getCategories();
    props.getColors();
    getProducts(selectedColor, selectedPrice);
  }, []);

  const navigation = useNavigation();
  const [categoryVisible, setCategory] = useState(false);
  const [priceVisible, setPrice] = useState(false);
  const [colorVisible, setColor] = useState(false);
  const [selectedCategory, setSelectCategory] = useState({});
  const [selectedColor, setSelectedColor] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [displayProduct, setDisplay] = useState([]);
  const [productList, setProduct] = useState({});
  const [selectedPrice, setSelectedPrice] = useState({
    sortBy: '',
    sortIn: '',
  });
  const [error, setError] = useState('');
  const category = props.categoryList;

  const getProducts = (color, price) => {
    let item;
    if (selectedCategory.category_id) {
      item = selectedCategory;
    } else {
      props.route.params?.productId
        ? (item = props.route.params?.productId)
        : (item = selectedCategory);
    }

    axios
      .get(`${baseUrl}/commonProducts`, {
        params: {
          category_id: item.category_id,
          color_id: color.color_id,
          sortBy: price.sortBy,
          sortIn: price.sortIn,
        },
      })
      .then((response) => {
        if (response.data.message === 'No Product is available') {
          setProduct({});
          setDisplay([]);
        } else {
          setProduct(response.data);
          setDisplay(response.data.product_details.slice(0, 5));
        }
        setSelectCategory(item);
        setLoading(false);
      })
      .catch((err) => {
        // console.log('Products', err.response);

        setError('SomeThing Went wrong');

        setLoading(false);
      });
  };

  const clearCategoryProducts = () => {
    let colorId;
    {
      selectedColor.color_id === ''
        ? (colorId = '')
        : (colorId = selectedColor.color_id);
    }
    axios
      .get(`${baseUrl}/commonProducts`, {
        params: {
          category_id: '',
          color_id: colorId,
        },
      })
      .then((response) => {
        if (response.data.message === 'No Product is available') {
          setProduct({});
          setDisplay([]);
        } else {
          setProduct(response.data);
          setDisplay(response.data.product_details.slice(0, 5));
        }
        setLoading(false);
      })
      .catch((error) => {
        // console.log(error.response.data);
        setLoading(false);
      });
  };

  const clearColorProducts = (val) => {
    let categoryId;
    {
      val?.category_id === ''
        ? (categoryId = '')
        : (categoryId = val.category_id);
    }

    setSelectedColor({
      color_id: '',
      color_name: '',
      color_code: '',
    });
    // console.log('selected', selectedPrice);
    axios
      .get(`${baseUrl}/commonProducts`, {
        params: {
          category_id: categoryId,
          color_id: '',
          sortBy: selectedPrice.sortBy,
          sortIn: selectedPrice.sortIn,
        },
      })
      .then((response) => {
        if (response.data.message === 'No Product is available') {
          setProduct({});
          setDisplay([]);
        } else {
          // console.log('response', response.data);
          setProduct(response.data);
          setDisplay(response.data.product_details.slice(0, 5));
        }
        setLoading(false);
      })
      .catch((error) => {
        // console.log(error.response.data);
        setLoading(false);
      });
  };

  const getProductsRating = () => {
    axios
      .get(`${baseUrl}/commonProducts`, {
        params: {
          sortBy: 'product_rating',
          sortIn: true,
        },
      })
      .then((response) => {
        setProduct(response.data);
        setDisplay(response.data.product_details.slice(0, 5));
        setLoading(false);
      })
      .catch((error) => {
        // console.log(error.response.data);
        setLoading(false);
      });
  };

  const handleLoadMore = () => {
    let start = page * 5;
    let end = (page + 1) * 5;
    if (end > productList.product_details.length) {
      end = productList.product_details.length;
    }
    const productData = productList.product_details.slice(start, end);
    setDisplay((prevState) => {
      return [...prevState, ...productData];
    });
    setPage((prev) => {
      return prev + 1;
    });
  };

  const handleLoader = () => {
    if (displayProduct.length === productList?.product_details?.length) {
      return <View></View>;
    } else {
      return <ActivityIndicator size={'large'} color={'blue'} />;
    }
  };

  const selectCategory = (val) => {
    setSelectCategory(val);
    productByCategory(val);
  };
  const selectColor = (color) => {
    setSelectedColor(color);
    productByColor(color);
  };
  const selectPrice = (val) => {
    setSelectedPrice(val);
    productByPrice(val);
  };
  const closeModal = () => {
    setCategory(false);
    setPrice(false);
    setColor(false);
  };

  const productByCategory = (val) => {
    setCategory(false);
    setLoading(true);
    clearColorProducts(val);
  };

  const clearCategory = () => {
    setLoading(true);
    setSelectCategory({
      category_id: '',
      category_name: '',
    });
    clearCategoryProducts();
  };

  const productByColor = (color) => {
    setColor(false);
    setLoading(true);
    getProducts(color, selectedPrice);
  };

  const clearColor = () => {
    setLoading(true);
    setSelectedColor({
      color_id: '',
      color_name: '',
      color_code: '',
    });
    clearColorProducts(selectedCategory);
  };

  const productByPrice = (val) => {
    setPrice(false);
    setLoading(true);
    getProducts(selectedColor, val);
  };

  const productByRating = () => {
    setLoading(true);
    clearColorProducts();
  };

  if (error) {
    return <Somethingwrong />;
  }

  if (isLoading) {
    return (
      <LottieView
        source={require('../assests/images/4383-circle-loader.json')}
        autoPlay
        loop
      />
    );
  } else {
    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          {selectedCategory.category_name === undefined ||
          selectedCategory.category_name === '' ? (
            <View></View>
          ) : (
            <Chips
              text={selectedCategory.category_name}
              color={'#777'}
              clearFilter={clearCategory}
            />
          )}

          {selectedColor.color_name === undefined ||
          selectedColor.color_name === '' ? (
            <View></View>
          ) : (
            <Chips
              text={selectedColor.color_name}
              color={selectedColor.color_code}
              clearFilter={clearColor}
            />
          )}
        </View>
        {displayProduct.length === 0 ? (
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
              No Product is available
            </Text>
          </View>
        ) : (
          <View style={{marginBottom: 90}}>
            <FlatList
              data={displayProduct}
              keyExtractor={(item) => {
                return item._id;
              }}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={1}
              ListFooterComponent={handleLoader}
              renderItem={({item, index}) => (
                <View
                  style={{
                    backgroundColor: '#e7e7e7',
                    marginBottom: 5,
                    marginTop: 5,
                  }}>
                  <View style={cardStyles.cardWrapper}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('ProductDetail', {
                          data: item.product_id,
                          product_name: item.product_name,
                        });
                      }}>
                      <View style={cardStyles.card}>
                        <View style={cardStyles.cardImgWrapper}>
                          <ImageBackground
                            source={{
                              uri: `${baseUrl}/${item.product_image}`,
                            }}
                            resizeMode="cover"
                            style={cardStyles.cardImg}>
                            <View style={styles.productView}>
                              <Text
                                style={
                                  index % 2 == 0
                                    ? styles.textHeadRight
                                    : styles.textHeadLeft
                                }>
                                {item.product_name}
                              </Text>
                              <View
                                style={
                                  index % 2 == 0
                                    ? styles.rateRight
                                    : styles.rateLeft
                                }>
                                <Rating
                                  count={5}
                                  startingValue={Number(item.product_rating)}
                                  imageSize={20}
                                  readonly={true}
                                  showRating={false}
                                  tintColor="rgba( 0, 0, 0, 0.5 )"
                                  type={'custom'}
                                />
                              </View>
                              <Text
                                style={
                                  index % 2 == 0
                                    ? styles.textRight
                                    : styles.textLeft
                                }>
                                {'\u20B9'}
                                {item.product_cost}
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
          </View>
        )}
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => {
              setCategory(true);
            }}>
            <View style={{paddingVertical: 10, paddingLeft: 30}}>
              <FontAwesome
                name="list-alt"
                color={'black'}
                size={25}
                style={styles.icon}
              />
              <Text style={{fontWeight: 'bold'}}>Catogery</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setColor(true);
            }}>
            <View style={{paddingVertical: 10, paddingLeft: 50}}>
              <FontAwesome
                name="palette"
                color={'black'}
                size={25}
                style={styles.icon}
              />
              <Text style={{fontWeight: 'bold'}}>Color</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setSelectedPrice({
                sortBy: 'product_rating',
                sortIn: true,
              });
              productByRating();
            }}>
            <View style={{paddingVertical: 10, paddingLeft: 50}}>
              <FontAwesome
                name="star"
                color={'black'}
                size={25}
                style={styles.icon}
              />
              <Text style={{fontWeight: 'bold'}}>Rating</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setPrice(true);
            }}>
            <View
              style={{paddingVertical: 10, paddingLeft: 50, paddingRight: 60}}>
              <FontAwesome
                name="rupee-sign"
                color={'black'}
                size={25}
                style={styles.icon}
              />
              <Text style={{fontWeight: 'bold'}}>Price</Text>
            </View>
          </TouchableOpacity>
        </View>
        <CategoryModal
          visible={categoryVisible}
          closeModal={closeModal}
          selectCategory={selectCategory}
          categoryList={category.length > 0 ? category : []}
          productByCategory={productByCategory}
          selectedCategory={selectedCategory.category_name}
        />
        <PriceModal
          visible={priceVisible}
          closeModal={closeModal}
          selectPrice={selectPrice}
          productByPrice={productByPrice}
          selectedPrice={selectedPrice.sortIn}
        />
        <ColorModal
          visible={colorVisible}
          closeModal={closeModal}
          selectColor={selectColor}
          colorsList={props.colors}
          productByColor={productByColor}
          selectedColor={selectedColor}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categoryList: state.productReducer.category,
    colors: state.productReducer.colors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => dispatch(getCategories()),
    getColors: () => dispatch(getColors()),
  };
};

const styles = StyleSheet.create({
  productView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  footer: {
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderTopColor: '#777',
    position: 'absolute',
    shadowColor: '#777',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#e7e7e7',
    borderTopWidth: 1,
    bottom: 0,
    width: '100%',
  },
  textHeadLeft: {
    color: 'white',
    fontSize: 20,
    paddingLeft: 20,
    paddingTop: 30,
  },
  textLeft: {
    color: 'white',
    fontSize: 16,
    paddingLeft: 20,
    paddingTop: 5,
  },
  rateLeft: {
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
    paddingTop: 30,
  },
  textRight: {
    color: 'white',
    fontSize: 16,
    paddingRight: 20,
    textAlign: 'right',
    paddingTop: 5,
  },
  icon: {
    paddingLeft: 10,
  },
  modalStyle: {
    backgroundColor: 'white',
    margin: 50,
    padding: 40,
    // flex:1,
    borderRadius: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
