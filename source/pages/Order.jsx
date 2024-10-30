import React, {useContext, useEffect, useState} from 'react';
import BackgroundImage from '../images/backgrounds/cart_bg.png';
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BackIcon from '../images/rest/back_icon.png';
import {useNavigation} from '@react-navigation/native';
import {GlobalContext} from '../components/GlobalContext';
import {useGetRequest} from '../helpers/hooks';
import {TRANSLATE} from '../helpers/urls';

const {width, height} = Dimensions.get('window');
export default function Order({route}) {
  const {qrImage} = route.params;
  const navigation = useNavigation();
  const {lang, refresh, setRefresh} = useContext(GlobalContext);
  const [translations, setTranslations] = useState([]);
  const getLanguagesRequest = useGetRequest({url: TRANSLATE});

  const getLanguages = async () => {
    const {response} = await getLanguagesRequest.request();
    if (response?.length) {
      setTranslations(response);
    }
  };

  useEffect(() => {
    getLanguages();
  }, []);
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ImageBackground source={BackgroundImage} style={styles.imageBackground}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image source={BackIcon} style={styles.backIcon} />
          </TouchableOpacity>
        </View>

        {qrImage ? (
          <View style={styles.qrContainer}>
            <Image source={{uri: qrImage}} style={styles.qrImage} />
          </View>
        ) : (
          ''
        )}

        {translations?.length ? (
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {
                translations.find(
                  item => item?.en === 'Show this code to the waiter',
                )[lang]
              }
            </Text>
          </View>
        ) : (
          ''
        )}
      </ImageBackground>
      <View style={styles.bottomView} />
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
  qrContainer: {
    backgroundColor: 'white',
    marginTop: height / 3.5,
    width: width / 2.5,
    height: width / 2.5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  qrImage: {
    width: width / 3,
    height: width / 3,
    alignSelf: 'center',
  },
  textContainer: {
    width: '100%',
    backgroundColor: '#870C9D',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  text: {
    color: '#FFFFFF',
    fontFamily: 'Jura-SemiBold',
    fontSize: 25,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  bottomView: {
    width: '100%',
    backgroundColor: '#870C9D',
    position: 'absolute',
    bottom: 0,
    height: 60,
  },
});
