import {useEffect, useState} from 'react';
import {movieDB} from '../api/movieDB';
import {Movie, MovieDBNowPlaying} from '../interfaces/movieInterface';

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [moviesInCinema, setMoviesInCinema] = useState<Movie[]>([]);

  const getMovies = async () => {
    const {data} = await movieDB.get<MovieDBNowPlaying>('/now_playing');
    setMoviesInCinema(data.results);
    setIsLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return {moviesInCinema, isLoading};
};
