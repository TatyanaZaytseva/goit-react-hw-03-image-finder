const API_KEY = '29872445-b11cb18030e5a7e55f6afbc9a';
const BASE_URL = 'https://pixabay.com/api/';
const PARAMS = 'image_type=photo&orientation=horizontal&per_page=12';

export const request = (imageName, setStatus, page) => {
  let url = `${BASE_URL}?q=${imageName}&page=${page}&key=${API_KEY}&${PARAMS}`;
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
  });
};
