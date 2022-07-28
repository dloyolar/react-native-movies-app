/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Movie} from '../interfaces/movieInterface';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../navigation/Navigation';

interface Props {
  movie: Movie;
  height?: number;
  width?: number;
}

type DetailScreenNavigationProp = StackNavigationProp<
  RootStackParams,
  'DetailScreen'
>;

export const MoviePoster = ({movie, width = 200, height = 400}: Props) => {
  const uri = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  const navigation = useNavigation<DetailScreenNavigationProp>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetailScreen', movie)}
      activeOpacity={0.8}
      style={{
        width,
        height,
        marginHorizontal: 2,
        paddingBottom: 20,
        paddingHorizontal: 7,
      }}>
      <View style={styles.imageContainer}>
        <Image source={{uri}} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 3.84,

    elevation: 10,
  },
  image: {
    flex: 1,
    borderRadius: 18,
  },
});
