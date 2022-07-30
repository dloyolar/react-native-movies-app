import React from 'react';
import {View, ActivityIndicator, Dimensions, ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Carousel from 'react-native-reanimated-carousel';

import {MoviePoster} from '../components/MoviePoster';
import {useMovies} from '../hooks/useMovies';
import {HorizontalSlider} from '../components/HorizontalSlider';
import {GradientBackground} from '../components/GradientBackground';
import {getImageColors} from '../helpers/getColors';

const {width: windowWidth} = Dimensions.get('window');
const HALF_PAGE = windowWidth / 2;

export const HomeScreen = () => {
  const {nowPlaying, popular, topRated, upComing, isLoading} = useMovies();
  const {top} = useSafeAreaInsets();

  const getPosterColors = async (index: number) => {
    const movie = nowPlaying[index];
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    const [primary, secondary] = await getImageColors(uri);
    console.log({primary, secondary});
  };

  if (isLoading) {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="red" size={100} />
      </View>
    );
  }

  return (
    <GradientBackground>
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
              data={nowPlaying}
              renderItem={({item}) => <MoviePoster movie={item} />}
              onSnapToItem={index => getPosterColors(index)}
            />
          </View>

          {/* POPULAR MOVIES */}
          <HorizontalSlider movies={popular} title="Populares" />
          <HorizontalSlider movies={topRated} title="Top Rated" />
          <HorizontalSlider movies={upComing} title="Próximos Estrenos" />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};
