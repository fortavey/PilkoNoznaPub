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
import BookConfirmIcon from '../images/rest/book_confirm_icon.png';

const {width, height} = Dimensions.get('window');
export default function BookConfirm() {
  const navigation = useNavigation();
  const {lang} = useContext(GlobalContext);
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

        <Image source={BookConfirmIcon} style={styles.qrImage} />

        {translations?.length ? (
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {
                translations.find(
                  item =>
                    item?.en === 'Your table has been successfully booked!',
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
  qrImage: {
    width: width / 3,
    height: width / 3,
    alignSelf: 'center',
    marginTop: height / 3.5,
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
