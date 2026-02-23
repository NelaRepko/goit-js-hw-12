import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const newBox = new  SimpleLightbox(".gallery a", {
  captionsData: "alt",       // беремо текст з alt
  captionPosition: "bottom", // позиція підпису знизу
  captionDelay: 250,         // затримка появи підпису
});

// Ця функція повинна приймати масив images, створювати HTML-розмітку для галереї, додавати її в контейнер галереї та викликати метод екземпляра SimpleLightbox refresh(). Нічого не повертає.
function createGallery(images) {

const galleryContainer = document.querySelector('.gallery');

  const markup = images.map(image => `
<li class="gallery-item">
  <a class="gallery-link" href="${image.largeImageURL}">
    <img 
      class="gallery-image" 
      src="${image.webformatURL}" 
      alt="${image.tags}"
    />
  </a>
  <div class="info">
    <div class="info-titles">
      <p>Likes</p>
      <p>Views</p>
      <p>Comments</p>
      <p>Downloads</p>
    </div>
    <div class="info-values">
      <p>${image.likes}</p>
      <p>${image.views}</p>
      <p>${image.comments}</p>
      <p>${image.downloads}</p>
    </div>
  </div>
</li>
  `).join('');

  galleryContainer.innerHTML = markup; //додаємо елементи галереї в контейнер

   // --- Додаємо стилі контейнеру ---
  galleryContainer.style.display = "flex";
  galleryContainer.style.flexWrap = "wrap";
  galleryContainer.style.gap = "24px";
  galleryContainer.style.justifyContent = "center";
  galleryContainer.style.alignItems = "center";
  galleryContainer.style.listStyle = "none";
  galleryContainer.style.maxWidth = "1200px";
  galleryContainer.style.margin = "0 auto";        // центр UL на сторінці

  // --- Додаємо стилі для кожної li ---
  const items = galleryContainer.querySelectorAll("li");
  items.forEach(item => {
    item.style.flex = "1 1 360px";
    item.style.height = "200px";
//    item.style.maxWidth = "100%";
    item.style.border = "1px solid #808080";
    item.style.overflow = "hidden";
//    item.style.justifyContent = "center";
//    item.style.alignItems = "center";
    item.style.width = "360px";
    item.style.display = "flex";
    item.style.flexDirection = "column";
  });
    // --- Стилі для img ---
const imgs = galleryContainer.querySelectorAll("img");
imgs.forEach(img => {
  img.style.width = "100%";
//  img.style.height = "100%";
  img.style.height = "160px";
  img.style.objectFit = "cover"; // картинка займає всю li
  img.style.display = "block";
});

const infos = galleryContainer.querySelectorAll(".info");
infos.forEach(info => {
  info.style.display = "flex";
  info.style.flexDirection = "column"; // колонки для заголовків і значень
  info.style.alignItems = "center";
  info.style.padding = "4px";
  info.style.fontSize = "12px";

  const titles = info.querySelector(".info-titles");
  const values = info.querySelector(".info-values");

  // перша лінійка: заголовки
  titles.style.display = "flex";
  titles.style.justifyContent = "space-around";
  titles.style.width = "100%";
  titles.style.fontWeight = "bold"; // <-- жирний шрифт для заголовків


  // друга лінійка: значення
  values.style.display = "flex";
  values.style.justifyContent = "space-around";
  values.style.width = "100%";
});

  newBox.refresh(); // оновлюємо екземпляр SimpleLightbox

}

// Ця функція нічого не приймає та повинна очищати вміст контейнера галереї. Нічого не повертає.
function clearGallery() {
const galleryContainer = document.querySelector('.gallery');
  galleryContainer.innerHTML = ''; // очищаємо весь вміст контейнера

  newBox.refresh(); // оновлюємо екземпляр SimpleLightbox
} 

// Ця функція нічого не приймає, повинна додавати клас для відображення лоадера. Нічого не повертає.
function showLoader() {
  const loader = document.getElementById('loader');
  loader.classList.remove('is-hidden'); // показати спінер

} 

// Ця функція нічого не приймає, повинна прибирати клас для відображення лоадера. Нічого не повертає.
function hideLoader() {
  const loader = document.getElementById('loader');
  loader.classList.add('is-hidden'); // приховати спінер
}


// Показати кнопку Load more
function showLoadMoreButton() {
  const button = document.querySelector('.load-more');
  button.classList.remove('is-hidden');
}

// Приховати кнопку Load more
function hideLoadMoreButton() {
  const button = document.querySelector('.load-more');
  button.classList.add('is-hidden');
}

export { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton };
