import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {GlobalContext} from '../components/GlobalContext';
import {useGetRequest, usePostRequest} from '../helpers/hooks';
import {ORDER, TRANSLATE} from '../helpers/urls';
import BackgroundImage from '../images/backgrounds/cart_bg.png';
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
import BackIcon from '../images/rest/back_icon.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartCard from '../components/CartCard';
import {currency} from '../helpers/avatars';
import ButtonLight from '../components/ButtonLight';
import LoadingModal from '../components/LoadingModal';
import CartEmptyIcon from '../images/rest/cart_empty_icon.png';

const {width, height} = Dimensions.get('window');

export default function Cart() {
  const navigation = useNavigation();
  const {lang, refresh, setRefresh} = useContext(GlobalContext);
  const [translations, setTranslations] = useState([]);
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const getLanguagesRequest = useGetRequest({url: TRANSLATE});
  const orderRequest = usePostRequest({url: ORDER});

  const getLanguages = async () => {
    const {response} = await getLanguagesRequest.request();
    if (response?.length) {
      setTranslations(response);
    }
  };

  const order = async () => {
    setLoading(true);
    const {response} = await orderRequest.request();
    if (response) {
      await AsyncStorage.setItem('cartList', '');
      navigation.navigate('Order', {qrImage: response?.res});
      setLoading(false);
      console.log(response);
    }
  };

  useEffect(() => {
    getLanguages();
  }, []);

  useEffect(() => {
    const getCart = async () => {
      const list = await AsyncStorage.getItem('cartList');
      if (list?.length) {
        setCart(JSON.parse(list));
      } else {
        setCart(null);
      }
    };

    getCart();
  }, [refresh]);

  useEffect(() => {
    if (cart?.length) {
      let sum = 0;
      cart.forEach(product => {
        sum += product.price * product.count;
      });

      setPrice(sum);
    }
  }, [cart, refresh]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ImageBackground source={BackgroundImage} style={styles.imageBackground}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={BackIcon} style={styles.backIcon} />
          </TouchableOpacity>
        </View>

        {cart && cart.length && translations?.length ? (
          <View>
            <Text style={styles.title}>
              {translations.find(item => item?.en === 'Order')[lang]}
            </Text>

            <View style={styles.main}>
              <ScrollView>
                {cart.map((item, index) => (
                  <CartCard item={item} key={index} />
                ))}

                <View style={styles.row}>
                  <Text style={styles.priceTitle}>
                    {
                      translations.find(item => item?.en === 'Total Amount')[
                        lang
                      ]
                    }
                    :
                  </Text>

                  <View style={styles.currency}>
                    <Text style={styles.currencyText}>
                      <Text style={styles.price}>
                        {price} {currency}
                      </Text>
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </View>

            <View style={{marginTop: 50}}>
              <ButtonLight
                text={
                  translations.find(item => item?.en === 'Place Order')[lang]
                }
                onPress={() => order()}
              />
            </View>
          </View>
        ) : translations?.length ? (
          <View>
            <Text style={[styles.title, {textAlign: 'center'}]}>
              {
                translations.find(item => item?.en === 'Your cart is empty')[
                  lang
                ]
              }
            </Text>

            <Image source={CartEmptyIcon} style={styles.cartEmptyIcon} />
          </View>
        ) : (
          ''
        )}
      </ImageBackground>

      {!translations?.length || loading ? <LoadingModal /> : ''}
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
  },
  backIcon: {
    width: 25,
    height: 25,
    objectFit: 'contain',
  },
  title: {
    fontFamily: 'Jura-SemiBold',
    color: '#FFFFFF',
    padding: 50,
    fontSize: 24,
  },
  main: {
    width: '90%',
    backgroundColor: '#870C9D',
    alignSelf: 'center',
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 40,
  },
  priceTitle: {
    fontFamily: 'Jura-SemiBold',
    color: '#FFFFFF',
    fontSize: 24,
  },
  price: {
    fontFamily: 'Jura-SemiBold',
    color: '#FFFFFF',
    fontSize: 24,
  },
  cartEmptyIcon: {
    alignSelf: 'center',
    width: width / 3,
    height: width / 3,
  },
});
