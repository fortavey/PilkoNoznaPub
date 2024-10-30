import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import BackgroundImage from '../images/backgrounds/lecture.png';
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import BackIcon from '../images/rest/back_icon.png';
import {GlobalContext} from '../components/GlobalContext';

export default function Lecture() {
  const navigation = useNavigation();
  const {lang} = useContext(GlobalContext);

  const images = {
    en: require('../images/events/en_lecture.png'),
    ru: require('../images/events/ru_lecture.png'),
    es: require('../images/events/es_lecture.png'),
    it: require('../images/events/it_lecture.png'),
    de: require('../images/events/de_lecture.png'),
    fr: require('../images/events/fr_lecture.png'),
    sw: require('../images/events/sw_lecture.png'),
    pl: require('../images/events/pl_lecture.png'),
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ImageBackground
        imageStyle={{objectFit: 'cover'}}
        source={images[lang]}
        style={styles.imageBackground}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={BackIcon} style={styles.backIcon} />
          </TouchableOpacity>
        </View>
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
    flex: 1,
    height: '112%',
  },
  headerMask: {
    width: '100%',
    objectFit: 'contain',
    marginTop: -20,
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
    fontSize: 24,
    textAlign: 'center',
  },
  main: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  broadcast: {
    width: '100%',
    backgroundColor: '#870C9D',
    borderRadius: 25,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 30,
    padding: 20,
    height: 120,
  },
  liga: {
    fontFamily: 'Jura-Bold',
    fontSize: 19,
    color: 'white',
    textAlign: 'left',
  },
  team: {
    fontFamily: 'Jura-Bold',
    fontSize: 19,
    color: 'white',
    textAlign: 'center',
  },
  date: {
    fontFamily: 'Jura-Bold',
    fontSize: 15,
    color: '#FF3FDC',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 3,
  },
  time: {
    fontFamily: 'Jura-Bold',
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 3,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 400,
  },
  description: {
    fontFamily: 'Jura-Bold',
    fontSize: 15,
    color: 'white',
    opacity: 0.8,
  },
});
