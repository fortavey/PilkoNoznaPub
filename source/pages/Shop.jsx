import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {GlobalContext} from '../components/GlobalContext';
import {useGetRequest} from '../helpers/hooks';
import {PRODUCTS, TRANSLATE} from '../helpers/urls';
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BackgroundImage from '../images/backgrounds/shop_bg.png';
import BackIcon from '../images/rest/back_icon.png';
import CartIcon from '../images/rest/cart_icon.png';
import LoadingModal from '../components/LoadingModal';
import FoodCard from '../components/FoodCard';

const {width, height} = Dimensions.get('window');

export default function Shop() {
  const navigation = useNavigation();
  const {lang, refresh, setRefresh} = useContext(GlobalContext);
  const [translations, setTranslations] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('salads');
  const getLanguagesRequest = useGetRequest({url: TRANSLATE});
  const getProductsRequest = useGetRequest({url: PRODUCTS});

  const getLanguages = async () => {
    const {response} = await getLanguagesRequest.request();
    if (response?.length) {
      setTranslations(response);
    }
  };

  const getProducts = async () => {
    const {response} = await getProductsRequest.request();
    if (response?.length) {
      setProducts(response);
    }
  };

  useEffect(() => {
    getLanguages();
    getProducts();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ImageBackground source={BackgroundImage} style={styles.imageBackground}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={BackIcon} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerText}></Text>

          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Image source={CartIcon} style={styles.backIcon} />
          </TouchableOpacity>
        </View>

        {translations?.length ? (
          <View>
            <View style={styles.main}>
              <TouchableOpacity
                style={
                  selectedCategory === 'salads'
                    ? styles.activeCategory
                    : styles.inactiveCategory
                }
                onPress={() => {
                  setSelectedCategory('salads');
                  setRefresh(!refresh);
                }}>
                <Text
                  style={
                    selectedCategory === 'salads'
                      ? styles.activeCategoryText
                      : styles.inActiveCategoryText
                  }>
                  {translations.find(item => item?.en === 'salads')[lang]}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={
                  selectedCategory === 'starters'
                    ? styles.activeCategory
                    : styles.inactiveCategory
                }
                onPress={() => {
                  setSelectedCategory('starters');
                  setRefresh(!refresh);
                }}>
                <Text
                  style={
                    selectedCategory === 'starters'
                      ? styles.activeCategoryText
                      : styles.inActiveCategoryText
                  }>
                  {translations.find(item => item?.en === 'starters')[lang]}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={
                  selectedCategory === 'desserts'
                    ? styles.activeCategory
                    : styles.inactiveCategory
                }
                onPress={() => {
                  setSelectedCategory('desserts');
                  setRefresh(!refresh);
                }}>
                <Text
                  style={
                    selectedCategory === 'desserts'
                      ? styles.activeCategoryText
                      : styles.inActiveCategoryText
                  }>
                  {translations.find(item => item?.en === 'desserts')[lang]}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  selectedCategory === 'drinks'
                    ? styles.activeCategory
                    : styles.inactiveCategory
                }
                onPress={() => {
                  setSelectedCategory('drinks');
                  setRefresh(!refresh);
                }}>
                <Text
                  style={
                    selectedCategory === 'drinks'
                      ? styles.activeCategoryText
                      : styles.inActiveCategoryText
                  }>
                  {translations.find(item => item?.en === 'drinks')[lang]}
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.mainScroll}>
              {products?.length && selectedCategory
                ? products
                    .filter(pro => pro.type === selectedCategory)
                    .map((item, index) => (
                      <FoodCard
                        item={item}
                        key={index}
                        translations={translations}
                      />
                    ))
                : ''}
            </ScrollView>
          </View>
        ) : (
          ''
        )}
      </ImageBackground>

      {!translations?.length ? <LoadingModal /> : ''}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    width: '100%',
    flex: 1,
  },
  imageBackground: {
    width: width,
    height: height,
  },
  headerMask: {
    width: '100%',
    objectFit: 'contain',
    marginTop: -20,
  },
  scrollView: {
    padding: 20,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#870C9D',
  },
  backIcon: {
    width: 25,
    height: 25,
    objectFit: 'contain',
  },
  headerText: {
    color: '#FFFFFF',
    fontFamily: 'Jura-SemiBold',
    fontSize: 30,
    marginLeft: -10,
  },
  main: {
    height: Dimensions.get('window').height / 7.5,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  activeCategory: {
    backgroundColor: '#D745F1',
    width: '45%',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    height: 40,
    borderColor: '#FFFFFF',
    borderWidth: 4,
  },
  inactiveCategory: {
    backgroundColor: '#870C9D',
    width: '45%',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    height: 40,
    borderColor: '#FFFFFF',
    borderWidth: 4,
  },
  activeCategoryText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Jura-Regular',
    fontWeight: 'bold',
  },
  inActiveCategoryText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Jura-Regular',
    fontWeight: 'bold',
  },
  mainScroll: {
    paddingHorizontal: 20,
    paddingBottom: 300,
  },
});
