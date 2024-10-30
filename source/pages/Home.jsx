import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import BackgroundImage from '../images/backgrounds/main_page_bg.png';
import HeaderMask from '../images/masks/main_header_mask.png';
import {useGetRequest} from '../helpers/hooks';
import {TRANSLATE} from '../helpers/urls';
import {GlobalContext} from '../components/GlobalContext';
import {useNavigation} from '@react-navigation/native';
import LoadingModal from '../components/LoadingModal';

const {width, height} = Dimensions.get('window');

export default function Home() {
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
        <Image style={styles.headerMask} source={HeaderMask} />

        {translations?.length ? (
          <ScrollView contentContainerStyle={styles.scrollView}>
            {/*<TouchableOpacity*/}
            {/*  style={styles.menuItem}*/}
            {/*  onPress={() => navigation.navigate('')}>*/}
            {/*  <Text style={styles.menuText}>*/}
            {/*    {translations.find(item => item?.en === 'Home')[lang]}*/}
            {/*  </Text>*/}
            {/*</TouchableOpacity>*/}

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('Shop')}>
              <Text style={styles.menuText}>
                {translations.find(item => item?.en === 'Shop')[lang]}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('Booking')}>
              <Text style={styles.menuText}>
                {translations.find(item => item?.en === 'Booking')[lang]}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('Events')}>
              <Text style={styles.menuText}>
                {translations.find(item => item?.en === 'Events')[lang]}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('Broadcasts')}>
              <Text style={styles.menuText}>
                {translations.find(item => item?.en === 'Broadcasts')[lang]}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('Account')}>
              <Text style={styles.menuText}>
                {translations.find(item => item?.en === 'Account')[lang]}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('Cart')}>
              <Text style={styles.menuText}>
                {translations.find(item => item?.en === 'Cart')[lang]}
              </Text>
            </TouchableOpacity>
          </ScrollView>
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
  menuItem: {
    width: '90%',
    backgroundColor: '#870C9D',
    borderRadius: 25,
    borderColor: '#FF7EC0',
    borderWidth: 5,
    height: 55,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  menuText: {
    color: '#FFFFFF',
    fontFamily: 'Jura-SemiBold',
    fontSize: 32,
  },
});
