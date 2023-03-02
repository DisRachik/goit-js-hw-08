// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
galleryEl.innerHTML = placeImageInGallery(galleryItems);

function placeImageInGallery(images) {
  return images
    .map(
      ({ preview, original, description }) =>
        `<a class='gallery__item' href='${original}'>
            <img class="gallery__image" src="${preview}" alt="${description}">
          </a>`
    )
    .join('');
}

new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoomFactor: 0.05,
});
