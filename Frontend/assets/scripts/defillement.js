$(document).ready(function () {
  if (window.matchMedia("(min-width: 48em)").matches) {
    let sections = $(".full-section");
    let currentSection = 0;
    let isScrolling = false;

    // Variables pour gérer les animations et les changements de couleur
    let header = $("header");
    let footer = $("footer");
    let nav = $("nav");
    let menu = $("#menu");
    let menuDiv = $(".menu");

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
        header.find("img").attr("src", "./assets/images/logos/logo-bleu.png");
        menu.css("background-color", "var(--violet-fonce)");
      } else {
        header.css("color", "var(--violet-clair)");
        footer.css("color", "var(--violet-clair)");
        nav.css("color", "var(--violet-clair)");
        header.find("img").attr("src", "./assets/images/logos/logo-violet.png");
        menu.css("background-color", "var(--bleu-fonce)");
      }

      // Ajouter la classe active à l'icône correspondante à la section actuelle
      nav.find("i").removeClass("active");
      nav.find("i").eq(currentSection).addClass("active");

      // Masquer la navigation sur la première section
      if (currentSection === 0) {
        nav.css("display", "none");
        $(".scrollDown").css("display", "flex");
      } else {
        nav.css("display", "flex");
        $(".scrollDown").css("display", "none");
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

    // Gestion du clic sur l'image du logo pour revenir à la section 0
    $("#logoAlizaryana").on("click", function () {
      scrollToSection(0);
    });

    // Gestion du survol de la souris sur le logo pour changer l'image
    $("#logoAlizaryana").on("mouseenter", function () {
      $(this).attr("src", "./assets/images/logos/logo-jaune.png");
    });

    // Gestion de la sortie de la souris du logo pour rétablir l'image précédente
    $("#logoAlizaryana").on("mouseleave", function () {
      if (currentSection % 2 === 1) {
        $(this).attr("src", "./assets/images/logos/logo-bleu.png");
      } else {
        $(this).attr("src", "./assets/images/logos/logo-violet.png");
      }
    });

    // Gestion de l'affichage de l'élément #scroll

    // Gestion du clic sur l'icone de scroll
    $(".scrollDown").on("click", function () {
      scrollToSection(currentSection + 1);
    });

    // Gestion du clic sur les icônes de la navigation
    nav.find("i").on("click", function () {
      let index = $(this).index();
      scrollToSection(index);
    });

    // Gestion du clic sur les liens du menu
    const menuLinks = $(".menu-nav--link .--link");

    menuLinks.each(function () {
      const sectionIndex = $(this).index();

      $(this).on("click", () => {
        // Fermer le menu immédiatement et définir la transition à 0
        menuDiv.removeClass("show").css("transition", "top 0s");

        // Faire défiler vers la section correspondante
        scrollToSection(sectionIndex);
      });
    });

    // Revenir à la section 0 lors du rafraîchissement de la page
    $(window).on("beforeunload", function () {
      $(window).scrollTop(0);
    });

    $(window).on("wheel", function (event) {
      let delta = event.originalEvent.deltaY;

      if (delta > 0) {
        scrollToSection(currentSection + 1);
      } else if (delta < 0) {
        scrollToSection(currentSection - 1);
      }
    });
  }
});
