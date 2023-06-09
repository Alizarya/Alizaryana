const galleryContainer = document.getElementById("gallery-container");
const images = galleryContainer.getElementsByTagName("img");
const scrollSpeed = 1; // Vitesse de défilement (en pixels par frame)
const delay = 2000; // Délai entre chaque défilement (en millisecondes)

let currentPosition = 0;
let animationId;
let isScrolling = false;

// Dupliquer les images pour créer une boucle
galleryContainer.innerHTML += galleryContainer.innerHTML;

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

// Démarrer le défilement automatique au chargement de la page
startScrolling();

// Arrêter le défilement lorsqu'un utilisateur survole la galerie
galleryContainer.addEventListener("mouseenter", stopScrolling);
galleryContainer.addEventListener("mouseleave", startScrolling);

// Arrêter le défilement lorsqu'un utilisateur clique sur une image
for (let i = 0; i < images.length; i++) {
  images[i].addEventListener("click", stopScrolling);
}

// Redémarrer le défilement après un certain délai
function restartScrolling() {
  setTimeout(startScrolling, delay);
}

// Redémarrer le défilement lorsqu'un utilisateur ne survole plus la galerie
galleryContainer.addEventListener("mouseleave", restartScrolling);
