import axios from 'axios';

export const movieDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: '13d47914ccc37bb147d87dac7f1150c6',
    language: 'es-ES',
  },
});
