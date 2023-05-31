$(document).ready(function () {
  let sections = $(".full-section");
  let currentSection = 0;
  let isScrolling = false;

  // Variables pour gérer les animations et les changements de couleur
  let header = $("header");
  let footer = $("footer");
  let nav = $("nav");
  let menu = $("#menu");

  // Animation de la transparence du header, du footer, et de la nav
  function animateElementsOut() {
    header.addClass("fade");
    footer.addClass("fade");
    nav.addClass("fade");
  }

  // Animation du retour du header, du footer, et de la nav
  function animateElementsIn() {
    header.removeClass("fade");
    footer.removeClass("fade");
    nav.removeClass("fade");

    // Gestion de la couleur d'affichage en fonction de la parité de la section
    if (currentSection % 2 === 1) {
      header.css("color", "var(--bleu-clair)");
      footer.css("color", "var(--bleu-clair)");
      nav.css("color", "var(--bleu-clair)");
      $("img").attr("src", "./assets/images/logos/logo-bleu.png");
      menu.css("background-color", "var(--violet-fonce)");
    } else {
      header.css("color", "var(--violet-clair)");
      footer.css("color", "var(--violet-clair)");
      nav.css("color", "var(--violet-clair)");
      $("img").attr("src", "./assets/images/logos/logo-violet.png");
      menu.css("background-color", "var(--bleu-fonce)");
    }

    // Ajouter la classe active à l'icône correspondante à la section actuelle
    nav.find("i").removeClass("active");
    nav.find("i").eq(currentSection).addClass("active");

    // Masquer la navigation sur la première section
    if (currentSection === 0) {
      nav.css("display", "none");
    } else {
      nav.css("display", "flex");
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

      // Animation lors du défilement
      animateElementsOut();

      // Réapparition après 1 seconde
      setTimeout(function () {
        animateElementsIn();
      }, 1000);
    }
  }

  // Gestion du clic sur les icônes de la navigation
  nav.find("i").on("click", function () {
    let index = $(this).index();
    scrollToSection(index);
  });

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
