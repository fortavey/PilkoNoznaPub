import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {GlobalContext} from '../components/GlobalContext';
import {useGetRequest, usePostRequest} from '../helpers/hooks';
import {BOOKING, TRANSLATE} from '../helpers/urls';
import BackgroundImage from '../images/backgrounds/cart_bg.png';
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BackIcon from '../images/rest/back_icon.png';
import ButtonLight from '../components/ButtonLight';
import LoadingModal from '../components/LoadingModal';

const {width, height} = Dimensions.get('window');

export default function Booking() {
  const navigation = useNavigation();
  const {lang} = useContext(GlobalContext);
  const [translations, setTranslations] = useState([]);
  const [loading, setLoading] = useState(false);
  const getLanguagesRequest = useGetRequest({url: TRANSLATE});
  const bookingRequest = usePostRequest({url: BOOKING});

  const getLanguages = async () => {
    const {response} = await getLanguagesRequest.request();
    if (response?.length) {
      setTranslations(response);
    }
  };

  const booking = async () => {
    setLoading(true);
    const {response} = await bookingRequest.request();
    if (response) {
      navigation.navigate('BookConfirm');
      setLoading(false);
    }
  };

  useEffect(() => {
    getLanguages();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ImageBackground source={BackgroundImage} style={styles.imageBackground}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={BackIcon} style={styles.backIcon} />
          </TouchableOpacity>
        </View>

        {translations?.length ? (
          <View>
            <Text style={styles.title}>
              {translations.find(item => item?.en === 'Booking')[lang]}
            </Text>

            <View style={styles.main}>
              <ScrollView>
                <TextInput
                  style={styles.textInput}
                  placeholderTextColor={'#656161'}
                  placeholder={
                    translations.find(item => item?.en === 'Your Name')[lang]
                  }
                />

                <TextInput
                  style={styles.textInput}
                  placeholderTextColor={'#656161'}
                  placeholder={
                    translations.find(item => item?.en === 'Your phone')[lang]
                  }
                />

                <TextInput
                  style={styles.textInput}
                  placeholderTextColor={'#656161'}
                  placeholder={
                    translations.find(item => item?.en === 'E-mail')[lang]
                  }
                />

                <TextInput
                  style={styles.textInput}
                  placeholderTextColor={'#656161'}
                  placeholder={
                    translations.find(item => item?.en === 'Select date')[lang]
                  }
                />

                <TextInput
                  style={styles.textInput}
                  placeholderTextColor={'#656161'}
                  placeholder={
                    translations.find(item => item?.en === 'Select time')[lang]
                  }
                />
              </ScrollView>
            </View>

            <View style={{marginTop: 50}}>
              <ButtonLight
                text={translations.find(item => item?.en === 'Book now')[lang]}
                onPress={() => booking()}
              />
            </View>
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
  textInput: {
    height: 45,
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 25,
    paddingLeft: 20,
    fontSize: 20,
    fontFamily: 'Jura-Bold',
    marginBottom: 10,
  },
});
