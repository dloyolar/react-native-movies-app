import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DetailScreen} from '../screens/DetailScreen';
import {HomeScreen} from '../screens/HomeScreen';
import {Movie} from '../interfaces/movieInterface';

export type RootStackParams = {
  Home: undefined;
  DetailScreen: Movie;
};

const Stack = createStackNavigator<RootStackParams>();

export const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          // backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
    </Stack.Navigator>
  );
};
