import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {GlobalContext} from '../components/GlobalContext';
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
import {useGetRequest} from '../helpers/hooks';
import {TRANSLATE} from '../helpers/urls';
import LoadingModal from '../components/LoadingModal';
import BackgroundImage from '../images/backgrounds/account_bg.png';
import BackIcon from '../images/rest/back_icon.png';
import AvatarIcon from '../images/rest/avatar.png';
import AvatarModal from '../components/AvatarModal';
import {avatars} from '../helpers/avatars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PolygonIcon from '../images/rest/polygon.png';

const {width, height} = Dimensions.get('window');

export default function Account() {
  const navigation = useNavigation();
  const {lang, avatar, name, setName, setLang} = useContext(GlobalContext);
  const [translations, setTranslations] = useState([]);
  const [avatarModal, setAvatarModal] = useState(false);
  const [language, setLanguage] = useState(false);
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

  const setNewLanguage = value => {
    setLang(value);
    AsyncStorage.setItem('language', value);
    setLanguage(false);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ImageBackground source={BackgroundImage} style={styles.imageBackground}>
        {translations?.length ? (
          <View>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={BackIcon} style={styles.backIcon} />
              </TouchableOpacity>
              <Text style={styles.headerText}>
                {translations.find(item => item?.en === 'Account')[lang]}
              </Text>

              <View />
            </View>

            <ScrollView
              contentContainerStyle={styles.scrollView}
              nestedScrollEnabled={true}>
              <View>
                <Image
                  source={
                    avatar
                      ? avatars.find(item => item?.name === avatar)?.image
                      : AvatarIcon
                  }
                  style={styles.avatarImage}
                />
                <TouchableOpacity
                  style={styles.changeButton}
                  onPress={() => setAvatarModal(true)}>
                  <Text style={styles.changeText}>
                    {translations.find(item => item?.en === 'Change')[lang]}
                  </Text>
                </TouchableOpacity>
              </View>

              <TextInput
                style={styles.textInput}
                placeholder={
                  translations.find(item => item?.en === 'Your Name')[lang]
                }
                placeholderTextColor={'#870C9D'}
                value={name}
                onChangeText={value => {
                  setName(value);
                  AsyncStorage.setItem('name', value);
                }}
              />

              {!language ? (
                <TouchableOpacity
                  style={styles.languagesInputContainer}
                  onPress={() => setLanguage(true)}>
                  <View style={styles.languageInput}>
                    <Text style={styles.languageText}>
                      {
                        translations.find(
                          item => item?.en === 'Choose Language',
                        )[lang]
                      }
                    </Text>
                  </View>
                  <View>
                    <Image source={PolygonIcon} style={styles.polygon} />
                  </View>
                </TouchableOpacity>
              ) : (
                <View style={styles.content}>
                  <ScrollView>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => setNewLanguage('ru')}>
                      <Text style={styles.buttonText}>Русский</Text>
                      {lang === 'ru' ? <View style={styles.circle} /> : ''}
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => setNewLanguage('en')}>
                      <Text style={styles.buttonText}>English</Text>
                      {lang === 'en' ? <View style={styles.circle} /> : ''}
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => setNewLanguage('es')}>
                      <Text style={styles.buttonText}>Español</Text>
                      {lang === 'es' ? <View style={styles.circle} /> : ''}
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => setNewLanguage('it')}>
                      <Text style={styles.buttonText}>Italiano</Text>
                      {lang === 'it' ? <View style={styles.circle} /> : ''}
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => setNewLanguage('de')}>
                      <Text style={styles.buttonText}>Deutsch</Text>
                      {lang === 'de' ? <View style={styles.circle} /> : ''}
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => setNewLanguage('fr')}>
                      <Text style={styles.buttonText}>Français</Text>
                      {lang === 'fr' ? <View style={styles.circle} /> : ''}
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => setNewLanguage('sw')}>
                      <Text style={styles.buttonText}>Schweizerisch</Text>
                      {lang === 'sw' ? <View style={styles.circle} /> : ''}
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => setNewLanguage('pl')}>
                      <Text style={styles.buttonText}>Polski</Text>
                      {lang === 'pl' ? <View style={styles.circle} /> : ''}
                    </TouchableOpacity>
                  </ScrollView>
                </View>
              )}
            </ScrollView>
          </View>
        ) : (
          <LoadingModal />
        )}

        {avatarModal ? (
          <AvatarModal
            modalVisible={avatarModal}
            setModalVisible={setAvatarModal}
          />
        ) : (
          ''
        )}
      </ImageBackground>
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
    paddingVertical: 10,
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
  avatarImage: {
    alignSelf: 'center',
    width: width * 0.5,
    height: width * 0.5,
    objectFit: 'contain',
  },
  scrollView: {
    height: height,
    paddingTop: 80,
  },
  changeButton: {
    borderColor: '#870C9D',
    borderRadius: 25,
    borderWidth: 3,
    width: width * 0.35,
    alignSelf: 'center',
    marginTop: -10,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  changeText: {
    color: '#870C9D',
    fontFamily: 'Jura-SemiBold',
    fontSize: 15,
    fontWeight: '900',
  },
  textInput: {
    borderColor: '#870C9D',
    borderRadius: 25,
    borderWidth: 5,
    width: width * 0.8,
    alignSelf: 'center',
    height: 50,
    marginTop: 30,
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Jura-SemiBold',
    fontSize: 20,
    fontWeight: '900',
  },
  languagesInputContainer: {
    width: '100%',
    marginTop: 20,
    position: 'relative',
  },
  languageInput: {
    borderColor: '#FF3FDC',
    borderRadius: 25,
    borderWidth: 5,
    width: width * 0.8,
    alignSelf: 'center',
    height: 55,
    marginTop: 30,
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Jura-SemiBold',
    fontSize: 20,
    fontWeight: '900',
    justifyContent: 'center',
    alignItems: 'center',
  },
  polygon: {
    width: 20,
    height: 20,
    objectFit: 'contain',
    position: 'absolute',
    zIndex: 101,
    top: -35,
    right: width / 6,
  },
  content: {
    width: '80%',
    height: '40%',
    alignSelf: 'center',
    backgroundColor: '#EFB2F4',
    zIndex: 101,
    borderRadius: 20,
    borderColor: '#FFFFFF',
    borderWidth: 5,
    marginTop: 20,
  },
  button: {
    paddingHorizontal: 20,
    height: (height * 0.4) / 8,
    borderBottomWidth: 2,
    borderColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Jura-SemiBold',
    fontSize: 20,
    fontWeight: '900',
    color: '#750861',
  },
  circle: {
    backgroundColor: '#870C9D',
    width: 15,
    height: 15,
    borderRadius: 50,
    zIndex: 101,
  },
  languageText: {
    textAlign: 'center',
    fontFamily: 'Jura-SemiBold',
    fontSize: 20,
    fontWeight: '900',
    color: '#870C9D',
  },
});
