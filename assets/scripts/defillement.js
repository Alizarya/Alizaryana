$(document).ready(function () {
  let sections = $(".full-section");
  let currentSection = 0;
  let isScrolling = false;

  // Variables pour gérer l'animation du header
  let header = $("header");
  let headerWidth = header.outerWidth();
  let windowWidth = $(window).width();

  // Fonction pour animer le déplacement du header hors de l'écran
  function animateHeaderOut() {
    header.addClass("header-hidden"); // Ajoute la classe pour masquer le header
  }

  // Fonction pour animer le retour du header sur l'écran
  function animateHeaderIn() {
    header.removeClass("header-hidden"); // Supprime la classe pour afficher le header

    // Gestion de la couleur d'affichage en fonction de la parité de la section
    if (currentSection % 2 === 1) {
      header.css("color", "var(--bleu-clair)");
    } else {
      header.css("color", "var(--violet-clair)");
    }
  }

  // Fonction pour faire défiler les sections
  function scrollToSection(index) {
    if (index >= 0 && index < sections.length && !isScrolling) {
      isScrolling = true;
      $("html, body").animate(
        {
          scrollTop: sections.eq(index).offset().top,
        },
        1000,
        function () {
          isScrolling = false;
        }
      );
      currentSection = index;

      // Animation du header lors du défilement
      animateHeaderOut();

      // Réapparition du header après 1 seconde
      setTimeout(function () {
        animateHeaderIn();
      }, 1000);
    }
  }

  $(window).on("wheel", function (event) {
    let delta = event.originalEvent.deltaY;

    if (delta > 0) {
      scrollToSection(currentSection + 1);
      event.preventDefault();
    } else {
      scrollToSection(currentSection - 1);
      event.preventDefault();
    }
  });
});
