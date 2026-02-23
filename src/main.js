import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import getImagesByQuery from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions.js';

// --- Селектори ---
const form = document.querySelector('.form');
const input = form.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-more');

// --- Глобальні змінні ---
let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

// --- Функція для оновлення кнопки Load More ---
function updateLoadMoreVisibility() {
  if (currentPage * 15 >= totalHits) {
    hideLoadMoreButton();
    iziToast.info({
      title: 'Info',
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
      timeout: 5000
    });
  } else {
    showLoadMoreButton();
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

  // --- Новий пошук ---
  currentQuery = query;
  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();

  showLoader();
  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    const hits = data.hits;
    totalHits = data.totalHits;

    if (hits.length === 0) {
      iziToast.warning({
        title: 'No results',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        timeout: 5000
      });
      return;
    }

    createGallery(hits);
    updateLoadMoreVisibility();
  } catch (error) {
    console.error('Error fetching images:', error);
  } finally {
    hideLoader();
  }
});

// --- Обробник кнопки Load More ---
loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    const hits = data.hits;

    // --- Додаємо нові елементи до існуючої галереї ---
    const galleryContainer = document.querySelector('.gallery');
    const existingImages = [...galleryContainer.querySelectorAll('li')].map(li => ({
      webformatURL: li.querySelector('img').src,
      largeImageURL: li.querySelector('a').href,
      likes: parseInt(li.querySelector('.info-values p:nth-child(1)').textContent),
      views: parseInt(li.querySelector('.info-values p:nth-child(2)').textContent),
      comments: parseInt(li.querySelector('.info-values p:nth-child(3)').textContent),
      downloads: parseInt(li.querySelector('.info-values p:nth-child(4)').textContent),
      tags: li.querySelector('img').alt
    }));

    createGallery([...existingImages, ...hits]);

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
    console.error('Error fetching more images:', error);
  } finally {
    hideLoader();
  }
});
