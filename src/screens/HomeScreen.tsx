import React from 'react';
import {View, ActivityIndicator, Dimensions, ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Carousel from 'react-native-reanimated-carousel';

import {MoviePoster} from '../components/MoviePoster';
import {useMovies} from '../hooks/useMovies';
import {HorizontalSlider} from '../components/HorizontalSlider';

const {width: windowWidth} = Dimensions.get('window');
const HALF_PAGE = windowWidth / 2;

export const HomeScreen = () => {
  const {moviesInCinema, isLoading} = useMovies();
  const {top} = useSafeAreaInsets();

  if (isLoading) {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="red" size={100} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={{marginTop: top}}>
        <View>
          <Carousel
            mode="parallax"
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              width: windowWidth,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            pagingEnabled={false}
            windowSize={2}
            snapEnabled
            height={420}
            width={HALF_PAGE}
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 0,
              parallaxAdjacentItemScale: 0.75,
            }}
            data={moviesInCinema}
            renderItem={({item}) => <MoviePoster movie={item} />}
          />
        </View>

        {/* POPULAR MOVIES */}
        <HorizontalSlider movies={moviesInCinema} title="Populares" />
      </View>
    </ScrollView>
  );
};
