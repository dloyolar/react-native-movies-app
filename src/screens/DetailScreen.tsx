/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  Text,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigation/Navigation';
import {useMovieDetails} from '../hooks/useMovieDetails';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import {MovieDetails} from '../components/MovieDetails';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const screenHeight = Dimensions.get('screen').height;

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> {}

export const DetailScreen = ({route}: Props) => {
  const movie = route.params;
  const uri = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  const {cast, isLoading, movieFull} = useMovieDetails(movie.id);
  const navigate = useNavigation();

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <Image source={{uri}} style={styles.posterImage} />
      </View>

      <View style={styles.marginContainer}>
        <Text style={styles.subTitle}>{movie.original_title}</Text>
        <Text style={styles.title}>{movie.title}</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator color="grey" size={35} style={{marginTop: 20}} />
      ) : (
        <MovieDetails movieFull={movieFull!} cast={cast} />
      )}

      <TouchableOpacity
        style={styles.backButton}
        activeOpacity={0.8}
        onPress={() => navigate.goBack()}>
        <Icon name="arrow-back-outline" color="white" size={60} />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: screenHeight * 0.7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 3.84,

    elevation: 10,
  },
  posterImage: {
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  subTitle: {
    fontSize: 16,
    opacity: 0.5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    zIndex: 999,
    elevation: 9,
    top: 30,
    left: 5,
  },
});
