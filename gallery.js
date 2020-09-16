import images from "./gallery-items.js";

const galleryRef = document.querySelector(".js-gallery");
const largeImageRef = document.querySelector(".lightbox__image");
const modalContainerRef = document.querySelector(".js-lightbox");
const closeButtonRef = document.querySelector(
  'button[data-action="close-lightbox"]'
);
const overlayRef = document.querySelector(".js-overlay");

const imagesList = images.map((image) => {
  const list = document.createElement("li");
  const photo = document.createElement("img");
  list.append(photo);
  photo.src = image.preview;
  photo.alt = image.description;
  photo.setAttribute("original", image.original);
  photo.classList.add("gallery__image", "gallery__link");
  list.classList.add("gallery__item");
  return list;
});
galleryRef.append(...imagesList);

galleryRef.addEventListener("click", galleryClick);
closeButtonRef.addEventListener("click", closeModal);
overlayRef.addEventListener("click", closeModal);

function galleryClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  largeImageRef.src = event.target.getAttribute("original");
  largeImageRef.alt = event.target.alt;
  openModal();
}

function openModal() {
  modalContainerRef.classList.add("is-open");
}

function closeModal() {
  if (event.target.nodeName !== "IMG") {
    largeImageRef.src = "";
    modalContainerRef.classList.remove("is-open");
  }
}
