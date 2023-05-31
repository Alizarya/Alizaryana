$(document).ready(function () {
  let sections = $(".full-section");
  let currentSection = 0;
  let isScrolling = false;

  // Variables pour gérer l'animation du header et du footer
  let header = $("header");
  let footer = $("footer");

  // Fonction pour animer le déplacement du header et du footer hors de l'écran
  function animateElementsOut() {
    header.addClass("header-hidden"); // Ajoute la classe pour masquer le header
    footer.addClass("footer-hidden"); // Ajoute la classe pour masquer le footer
  }

  // Fonction pour animer le retour du header et du footer sur l'écran
  function animateElementsIn() {
    header.removeClass("header-hidden"); // Supprime la classe pour afficher le header
    footer.removeClass("footer-hidden"); // Supprime la classe pour afficher le footer

    // Gestion de la couleur d'affichage en fonction de la parité de la section
    if (currentSection % 2 === 1) {
      header.css("color", "var(--bleu-clair)");
      footer.css("color", "var(--bleu-clair)");
    } else {
      header.css("color", "var(--violet-clair)");
      footer.css("color", "var(--violet-clair)");
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

      // Animation du header et du footer lors du défilement
      animateElementsOut();

      // Réapparition du header et du footer après 1 seconde
      setTimeout(function () {
        animateElementsIn();
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
