import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {GlobalContext} from '../components/GlobalContext';
import {useGetRequest} from '../helpers/hooks';
import {TRANSLATE} from '../helpers/urls';
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
import LoadingModal from '../components/LoadingModal';

const {width, height} = Dimensions.get('window');

export default function Events() {
  const navigation = useNavigation();
  const {lang} = useContext(GlobalContext);
  const [translations, setTranslations] = useState([]);
  const [loading, setLoading] = useState(false);
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={BackIcon} style={styles.backIcon} />
          </TouchableOpacity>
        </View>

        {translations?.length ? (
          <View>
            <Text style={styles.title}>
              {translations.find(item => item?.en === 'Events')[lang]}
            </Text>

            <View style={styles.main}>
              <ScrollView contentContainerStyle={styles.scrollView}>
                <TouchableOpacity
                  style={styles.broadcast}
                  onPress={() => navigation.navigate('Tako')}>
                  <Text style={styles.liga}>
                    {
                      translations.find(
                        item =>
                          item.en === "Let's cook a delicious Mexican taco",
                      )[lang]
                    }
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.description}>
                      {
                        translations.find(item => item.en === 'master class')[
                          lang
                        ]
                      }
                    </Text>
                    <View>
                      <Text style={styles.team}>19/10</Text>
                      <Text style={styles.team}>20:00</Text>
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.broadcast}
                  onPress={() => navigation.navigate('Auto')}>
                  <Text style={styles.liga}>
                    {
                      translations.find(
                        item => item.en === 'Auto racing 2024 Rally',
                      )[lang]
                    }
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.description}>
                      {
                        translations.find(item => item.en === 'watching races')[
                          lang
                        ]
                      }
                    </Text>
                    <View>
                      <Text style={styles.team}>24/10</Text>
                      <Text style={styles.team}>22:00</Text>
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.broadcast}
                  onPress={() => navigation.navigate('Lecture')}>
                  <Text style={styles.liga}>
                    {
                      translations.find(
                        item => item.en === "Lecture 'Healthy Nutrition'",
                      )[lang]
                    }
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.description}>
                      {
                        translations.find(
                          item => item.en === 'lecture from a nutritionist',
                        )[lang]
                      }
                    </Text>
                    <View>
                      <Text style={styles.team}>25/10</Text>
                      <Text style={styles.team}>15:00</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </ScrollView>
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
