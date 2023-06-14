// Sélectionne toutes les div enfants de la div avec la classe "outils-box"
const outilsBoxes = document.querySelectorAll(".outils-box > div");
const logos = document.querySelectorAll(".outils-logo i");

// Variable pour suivre l'index de la div actuellement affichée
let currentIndex = 0;

// Fonction pour afficher la div suivante
function afficherDivSuivante() {
  // Masque la div actuellement affichée
  outilsBoxes[currentIndex].classList.remove("activeTool");
  logos[currentIndex].classList.remove("active");

  // Incrémente l'index pour afficher la div suivante
  currentIndex = (currentIndex + 1) % outilsBoxes.length;

  // Affiche la div suivante avec un délai
  setTimeout(() => {
    outilsBoxes[currentIndex].classList.add("activeTool");
    logos[currentIndex].classList.add("active");
  }, 1000);
}

// Affiche la première div
outilsBoxes[currentIndex].classList.add("activeTool");
logos[currentIndex].classList.add("active");

// Répète l'affichage des div toutes les 5 secondes
let intervalId = setInterval(afficherDivSuivante, 5000);

// Gère l'événement de survol de l'aside
const aside = document.querySelector(".outils");
aside.addEventListener("mouseenter", () => {
  clearInterval(intervalId); // Arrête le changement automatique des div
});

aside.addEventListener("mouseleave", () => {
  // Reprend le changement automatique des div après avoir quitté l'aside
  intervalId = setInterval(afficherDivSuivante, 5000);
});

// Gère l'événement de clic sur un logo
logos.forEach((logo, index) => {
  logo.addEventListener("click", () => {
    // Masque la div actuellement affichée
    outilsBoxes[currentIndex].classList.remove("activeTool");
    logos[currentIndex].classList.remove("active");

    // Affiche la div associée au logo cliqué
    outilsBoxes[index].classList.add("activeTool");
    logos[index].classList.add("active");

    // Met à jour l'index actuel
    currentIndex = index;

    // Arrête le changement automatique des div
    clearInterval(intervalId);
  });
});
