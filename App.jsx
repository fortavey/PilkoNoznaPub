import React, { useEffect, useState } from 'react';
import {ActivityIndicator, View, StatusBar, StyleSheet, NativeModules} from 'react-native';
import Navigation from './source/Navigation';
import {GlobalProvider} from './source/components/GlobalContext';

export default function App() {


  
      return <GlobalProvider>
        <StatusBar />
        <Navigation />
      </GlobalProvider>
}

const styles = StyleSheet.create({
  cont: {
    flex:1,
    alignItems:'center', 
    justifyContent:'center'
  }
})
