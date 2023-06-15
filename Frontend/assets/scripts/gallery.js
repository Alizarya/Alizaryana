// Récupérer la référence de la galerie
const galleryContainer = document.getElementById("gallery-container");

// Vitesse de défilement (en pixels par frame)
const scrollSpeed = 0.8;

// Délai entre chaque défilement (en millisecondes)
const delay = 2000;

// Quantité de défilement lors du clic sur les chevrons (en pixels)
const scrollAmount = 500;

// URL de l'API pour récupérer les données des images
const apiUrl = "http://localhost:5000/creations";

let currentPosition = 0;
let animationId;
let isScrolling = false;

// Fonction pour mélanger l'ordre des éléments d'un tableau
function shuffleArray(array) {
  const newArray = array.slice();
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Charger les données depuis l'API et afficher les images
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    const creations = shuffleArray(data);

    for (let i = 0; i < creations.length; i++) {
      const image = document.createElement("img");
      const imageUrl =
        "http://localhost:5000" + creations[i].image.replace(".", "");
      image.src = imageUrl;
      image.alt = creations[i].alt;
      galleryContainer.appendChild(image);
    }

    // ...
  })
  .catch((error) => {
    console.log(
      "Une erreur s'est produite lors de la récupération des données :",
      error
    );
  });

const images = galleryContainer.getElementsByTagName("img");

function scrollImages() {
  currentPosition += scrollSpeed;
  galleryContainer.scrollLeft = currentPosition;

  if (currentPosition >= galleryContainer.scrollWidth / 2) {
    currentPosition = 0; // Revenir au début une fois qu'on a atteint la fin
  }

  animationId = requestAnimationFrame(scrollImages);
}

function startScrolling() {
  if (!isScrolling) {
    isScrolling = true;
    scrollImages();
  }
}

function stopScrolling() {
  if (isScrolling) {
    isScrolling = false;
    cancelAnimationFrame(animationId);
  }
}

function scrollLeft() {
  stopScrolling();
  currentPosition -= scrollAmount;
  if (currentPosition < 0) {
    currentPosition = 0; // Ne pas dépasser le début
  }
  galleryContainer.scrollLeft = currentPosition;
}

function scrollRight() {
  stopScrolling();
  currentPosition += scrollAmount;
  if (currentPosition >= galleryContainer.scrollWidth / 2) {
    currentPosition = 0; // Revenir au début une fois qu'on a atteint la fin
  }
  galleryContainer.scrollLeft = currentPosition;
}

function restartScrolling() {
  setTimeout(startScrolling, delay);
}

startScrolling();

galleryContainer.addEventListener("mouseenter", stopScrolling);
galleryContainer.addEventListener("mouseleave", startScrolling);

for (let i = 0; i < images.length; i++) {
  images[i].addEventListener("click", stopScrolling);
}

galleryContainer.addEventListener("mouseleave", restartScrolling);

const chevronLeft = document.querySelector(".fa-angle-left");
chevronLeft.addEventListener("click", scrollLeft);

const chevronRight = document.querySelector(".fa-angle-right");
chevronRight.addEventListener("click", scrollRight);
