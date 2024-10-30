import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function ButtonLight({text, onPress}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 50,
    marginTop: 10,
    position: 'absolute',
    bottom: 30,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 25,
    width: '90%',
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
  },
  text: {
    color: '#240653',
    fontSize: 20,
    fontFamily: 'Jura-Regular',
    fontWeight: 'bold',
  },
  image: {
    height: 60,
    objectFit: 'contain',
    position: 'absolute',
    right: -20,
  },
});
