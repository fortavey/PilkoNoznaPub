import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './pages/Home';
import Account from './pages/Account';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Order from './pages/Order';
import Booking from './pages/Booking';
import BookConfirm from './pages/BookConfirm';
import Broadcasts from './pages/Broadcasts';
import Events from './pages/Events';
import Tako from './pages/Tako';
import Auto from './pages/Auto';
import Lecture from './pages/Lecture';

const Stack = createStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen component={Home} name="Home" />
        <Stack.Screen component={Account} name="Account" />
        <Stack.Screen component={Shop} name="Shop" />
        <Stack.Screen component={Cart} name="Cart" />
        <Stack.Screen component={Order} name="Order" />
        <Stack.Screen component={Booking} name="Booking" />
        <Stack.Screen component={BookConfirm} name="BookConfirm" />
        <Stack.Screen component={Broadcasts} name="Broadcasts" />
        <Stack.Screen component={Events} name="Events" />
        <Stack.Screen component={Tako} name="Tako" />
        <Stack.Screen component={Auto} name="Auto" />
        <Stack.Screen component={Lecture} name="Lecture" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
