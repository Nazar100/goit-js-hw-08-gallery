import images from './gallery-items.js';

const galleryRef = document.querySelector('.js-gallery');
const largeImageRef = document.querySelector('.lightbox__image');
const modalContainerRef = document.querySelector('.js-lightbox');
const closeButtonRef = document.querySelector(
    'button[data-action="close-lightbox"]',
);
const overlayRef = document.querySelector('.js-overlay');
const nextRef = document.querySelector('.arrow-next');

const imagesList = images.map((image, index) => {
    const list = document.createElement('li');
    const link = document.createElement('a');
    const photo = document.createElement('img');
    link.appendChild(photo);
    list.appendChild(link);
    photo.src = image.preview;
    photo.alt = image.description;
    photo.dataset.source = image.original;
    photo.dataset.index = index;
    photo.classList.add('gallery__image');
    link.classList.add('gallery__link');
    list.classList.add('gallery__item');
    return list;
});
galleryRef.append(...imagesList);

galleryRef.addEventListener('click', galleryClick);
closeButtonRef.addEventListener('click', closeModal);
overlayRef.addEventListener('click', closeModal);
nextRef.addEventListener('click', nextImage);
let array = [];
function galleryClick(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    largeImageRef.src = event.target.dataset.source;
    largeImageRef.alt = event.target.alt;
    largeImageRef.dataset.index = event.target.dataset.index;

    openModal();
}

images.map((image, index) => {
    image.dataset.index = index;
});

console.log(images);

function openModal() {
    modalContainerRef.classList.add('is-open');
}

function closeModal(event) {
    if (event.target.nodeName !== 'IMG' && event.target !== nextRef) {
        largeImageRef.src = '';
        modalContainerRef.classList.remove('is-open');
    }
}
function nextImage() {
    largeImageRef.src = [largeImageRef.src++];
    console.log([largeImageRef.dataset.index++]);
    console.log(largeImageRef.dataset.index, largeImageRef);
}
console.log(array);
