import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {GlobalContext} from '../components/GlobalContext';
import {useGetRequest} from '../helpers/hooks';
import {BROADCASTS, TRANSLATE} from '../helpers/urls';
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

export default function Broadcasts() {
  const navigation = useNavigation();
  const {lang} = useContext(GlobalContext);
  const [translations, setTranslations] = useState([]);
  const [broadcasts, setBroadcasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const getLanguagesRequest = useGetRequest({url: TRANSLATE});
  const broadcastsRequest = useGetRequest({url: BROADCASTS});

  const getLanguages = async () => {
    const {response} = await getLanguagesRequest.request();
    if (response?.length) {
      setTranslations(response);
    }
  };

  const getBroadcasts = async () => {
    const {response} = await broadcastsRequest.request();
    if (response?.length) {
      setBroadcasts(response);
    }
  };

  useEffect(() => {
    getLanguages();
    getBroadcasts();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ImageBackground source={BackgroundImage} style={styles.imageBackground}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={BackIcon} style={styles.backIcon} />
          </TouchableOpacity>
        </View>

        {translations?.length && broadcasts?.length ? (
          <View>
            <Text style={styles.title}>
              {translations.find(item => item?.en === 'Broadcasts')[lang]}
            </Text>

            <View style={styles.main}>
              <ScrollView contentContainerStyle={styles.scrollView}>
                {broadcasts?.map((item, index) => (
                  <View style={styles.broadcast} key={index}>
                    <View>
                      <Text style={styles.liga}>{item?.liga}</Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={styles.date}>{item?.date}</Text>
                        <Text style={styles.time}>{item?.time}</Text>
                      </View>
                    </View>

                    <View>
                      <Text style={styles.team}>{item?.team1}</Text>
                      <Text style={styles.team}>{item?.team2}</Text>
                    </View>
                  </View>
                ))}
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
    borderWidth: 2,
    borderRadius: 25,
    borderColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    padding: 20,
  },
  liga: {
    fontFamily: 'Jura-Bold',
    fontSize: 17,
    color: 'white',
    textAlign: 'center',
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
});
