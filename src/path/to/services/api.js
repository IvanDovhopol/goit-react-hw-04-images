import axios from 'axios';

const API_KEY = '24325435-7f403507b2d97ff755af9f968';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const allOpts = 'image_type=photo&pretty=true&per_page=12';

export const getImages = async (query, page) => {
  const response = await axios.get(
    `?key=${API_KEY}&q=${query}&${allOpts}&page=${page}`
  );

  return response.data;
};
