// Récupérer la référence de la galerie
const galleryContainer = document.getElementById("gallery-container");

// Vitesse de défilement (en pixels par frame)
const scrollSpeed = 0.8;

// Délai entre chaque défilement (en millisecondes)
const delay = 2000;

// Quantité de défilement lors du clic sur les chevrons (en pixels)
const scrollAmount = 500;

// Chemin du fichier JSON contenant les données des images
const jsonFilePath = "./assets/data/creations.json";

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

// Charger le fichier creations.json et afficher les images
fetch(jsonFilePath)
  .then((response) => response.json())
  .then((data) => {
    const creations = shuffleArray(data.creations);

    for (let i = 0; i < creations.length; i++) {
      const image = document.createElement("img");
      image.src = creations[i].image;
      image.alt = creations[i].alt;
      galleryContainer.appendChild(image);
    }

    // Dupliquer les images pour créer une boucle
    galleryContainer.innerHTML += galleryContainer.innerHTML;

    // Démarrer le défilement automatique au chargement de la page
    startScrolling();
  })
  .catch((error) => {
    console.log(
      "Une erreur s'est produite lors du chargement du fichier JSON :",
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
