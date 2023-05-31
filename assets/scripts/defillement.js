$(document).ready(function () {
  let sections = $(".full-section"); // Sélectionne toutes les sections avec la classe "full-section"
  let currentSection = 0; // Initialise l'index de la section courante à 0
  let isScrolling = false; // Variable pour vérifier si le défilement est en cours

  function scrollToSection(index) {
    if (index >= 0 && index < sections.length && !isScrolling) {
      isScrolling = true; // Définit la variable de défilement en cours à true
      $("html, body").animate(
        {
          scrollTop: sections.eq(index).offset().top, // Anime le défilement vers la position de la section spécifiée
        },
        1000, // Durée de l'animation en millisecondes
        function () {
          isScrolling = false; // Définit la variable de défilement en cours à false une fois l'animation terminée
        }
      );
      currentSection = index; // Met à jour l'index de la section courante
    }
  }

  $(window).on("wheel", function (event) {
    let delta = event.originalEvent.deltaY; // Récupère la valeur du déplacement de la molette

    if (delta > 0) {
      // Faites défiler vers le bas
      scrollToSection(currentSection + 1); // Appelle la fonction pour faire défiler vers la section suivante
      event.preventDefault(); // Empêche le comportement par défaut du défilement
    } else {
      // Faites défiler vers le haut
      scrollToSection(currentSection - 1); // Appelle la fonction pour faire défiler vers la section précédente
      event.preventDefault(); // Empêche le comportement par défaut du défilement
    }
  });
});
