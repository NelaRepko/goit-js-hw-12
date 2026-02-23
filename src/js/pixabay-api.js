// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

let limit_per_page = 15; 

async function getImagesByQuery(query, page = 1) { 
      
  try { 

    const res = await axios.get('', {
      params: {
        key: '54641961-e96e5217be963f5aab39f9ddc',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: limit_per_page, 
        page: page,               
      }
    });

    const data = res.data;

    if (data.hits.length === 0) {
      iziToast.warning({
        title: 'No results',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'center',
        timeout: 5000
      });
    }

    return data;

  } catch (error) {

    iziToast.error({
      title: 'Error',
      message: error.message,
      position: 'center',
      timeout: 5000
    });

    throw error;
  }
}

export default getImagesByQuery;