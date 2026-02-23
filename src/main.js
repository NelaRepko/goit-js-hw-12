import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import getImagesByQuery from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions.js';

// --- Селектори ---
const form = document.querySelector('.form');
const input = form.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-more');

// --- Повідомлення про кінець / пусту галерею ---
let endMessageDiv = document.querySelector('.end-message');
if (!endMessageDiv) {
  endMessageDiv = document.createElement('div');
  endMessageDiv.className = 'end-message';
  endMessageDiv.textContent = "We're sorry, but you've reached the end of search results.";
  document.querySelector('.gallery-footer').appendChild(endMessageDiv);
}

// --- Глобальні змінні ---
let currentQuery = '';
let currentPage = 1;
let totalHits = 0;
let loadedImages = [];

// --- Функція оновлення кнопки Load More ---
function updateLoadMoreVisibility() {
  if (loadedImages.length >= totalHits) {
    loadMoreBtn.classList.add('is-hidden');       // ховаємо кнопку
    endMessageDiv.classList.add('show');          // показуємо повідомлення
  } else {
    loadMoreBtn.classList.remove('is-hidden');    // показуємо кнопку
    endMessageDiv.classList.remove('show');       // ховаємо повідомлення
  }
}

// --- Обробник сабміту форми ---
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = input.value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query!',
      position: 'center',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  loadedImages = [];
  clearGallery();
  loadMoreBtn.classList.add('is-hidden');
  endMessageDiv.classList.remove('show');

  showLoader();
  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    const hits = data.hits;
    totalHits = data.totalHits;

    if (!hits || hits.length === 0) {
      endMessageDiv.textContent = "Sorry, there are no images matching your search query.";
      endMessageDiv.classList.add('show');
//      iziToast.info({
//        title: 'No results',
//        message: 'Sorry, there are no images matching your search query.',
//        position: 'center',
//      });
      return;
    }

    loadedImages = [...hits];
    createGallery(loadedImages);
    updateLoadMoreVisibility();

  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `Failed to fetch images: ${error.message}`,
      position: 'topRight',
      timeout: 5000
    });
    console.error('Error fetching images:', error);
  } finally {
    hideLoader();
  }
});

// --- Обробник кнопки Load More ---
loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  loadMoreBtn.classList.add('is-hidden');     // ховаємо кнопку одразу
  endMessageDiv.classList.remove('show');     // ховаємо повідомлення під час завантаження
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    const hits = data.hits;

    if (!hits || hits.length === 0) {
      endMessageDiv.textContent = "We're sorry, but you've reached the end of search results.";
      endMessageDiv.classList.add('show');
      iziToast.info({
        title: 'End',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'center',
      });
      return;
    }

    loadedImages.push(...hits);
    createGallery(loadedImages);

    // --- Плавна прокрутка ---
    const galleryItem = document.querySelector('.gallery li');
    if (galleryItem) {
      const { height } = galleryItem.getBoundingClientRect();
      window.scrollBy({
        top: height * 2,
        behavior: 'smooth'
      });
    }

    updateLoadMoreVisibility();

  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `Failed to load more images: ${error.message}`,
      position: 'topRight',
      timeout: 5000
    });
    console.error('Error fetching more images:', error);
  } finally {
    hideLoader();
  }
});

