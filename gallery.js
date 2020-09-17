import images from './gallery-items.js';

const galleryRef = document.querySelector('.js-gallery');
const largeImageRef = document.querySelector('.lightbox__image');
const modalContainerRef = document.querySelector('.js-lightbox');
const closeButtonRef = document.querySelector(
    'button[data-action="close-lightbox"]',
);
const overlayRef = document.querySelector('.js-overlay');
const nextRef = document.querySelector('.arrow-next');
const backRef = document.querySelector('.arrow-back');

const imagesList = images.map((image, index) => {
    const list = document.createElement('li');
    const link = document.createElement('a');
    const photo = document.createElement('img');
    link.appendChild(photo);
    list.appendChild(link);
    link.href = image.original;
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
backRef.addEventListener('click', backImage);
window.addEventListener('keyup', handleModalWithBtn);

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

function openModal() {
    modalContainerRef.classList.add('is-open');
}

function closeModal(event) {
    if (
        event.target.nodeName !== 'IMG' &&
        event.target !== nextRef &&
        event.target !== backRef
    ) {
        largeImageRef.src = '';
        modalContainerRef.classList.remove('is-open');
    }
}

function nextImage() {
    let index = '';

    if (largeImageRef.dataset.index < imagesList.length - 1) {
        index = largeImageRef.dataset.index++;
        index++;
    }
    setNewSrc(index);
}

function backImage() {
    let index = '';

    if (largeImageRef.dataset.index > 0) {
        index = largeImageRef.dataset.index--;
        index--;
    }
    setNewSrc(index);
}

function setNewSrc(index) {
    imagesList.forEach(image => {
        if (
            image.lastElementChild.lastElementChild.dataset.index ===
            index.toString()
        ) {
            largeImageRef.src =
                image.lastElementChild.lastElementChild.dataset.source;
            largeImageRef.alt = image.lastElementChild.lastElementChild.alt;
        }
    });
}

function handleModalWithBtn({ code }) {
    if (code === 'Escape') {
        largeImageRef.src = '';
        modalContainerRef.classList.remove('is-open');
    } else if (code === 'ArrowRight') {
        nextImage();
    } else if (code === 'ArrowLeft') {
        backImage();
    }
}
