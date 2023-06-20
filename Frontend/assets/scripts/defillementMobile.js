$(document).ready(function () {
  if (window.matchMedia("(max-width: 48em)").matches) {
    $("section:not(#accueil)").addClass("hidden");

    $("nav i").click(function () {
      // Récupérer l'index de l'icône cliquée
      let index = $(this).index();

      // Afficher la section correspondante en fonction de l'index
      $("section").addClass("hidden");
      $("section").eq(index).removeClass("hidden");

      // Mettre à jour les couleurs de la barre de navigation
      updateNavColors(index);

      // Mettre à jour la classe active de l'icône cliquée
      updateActiveIcon(index);
    });

    // Gestion du swipe
    $("body").swipe({
      swipeLeft: function () {
        showPreviousSection();
      },
      swipeRight: function () {
        showNextSection();
      },
      threshold: 100,
    });

    // Gestion de l'affichage de section
    function showSection(index) {
      $("section").addClass("hidden");
      $("section").eq(index).removeClass("hidden");
      updateActiveIcon(index);
    }

    // Fonction d'affichage de la section précédente
    function showPreviousSection() {
      let currentIndex = $("section:not(.hidden)").index();
      let prevIndex =
        (currentIndex - 1 + $("section").length) % $("section").length;

      showSection(prevIndex);
    }

    // Fonction d'affichage de la section suivante
    function showNextSection() {
      let currentIndex = $("section:not(.hidden)").index();
      let nextIndex = (currentIndex + 3) % $("section").length;

      showSection(nextIndex);
    }

    // Mettre les bonnes couleurs à la nav bar
    function updateNavColors(index) {
      let nav = $("nav");
      if (index % 2 === 1) {
        nav.css("color", "var(--bleu-clair)");
        nav.css("background-color", "var(--bleu-fonce)");
      } else {
        nav.css("color", "var(--violet-clair)");
        nav.css("background-color", "var(--violet-fonce)");
      }
    }

    // Mettre la bonne couleur à l'icone de la nav
    function updateActiveIcon(index) {
      $("nav i").removeClass("active");
      $("nav i").eq(index).addClass("active");
    }

    // Initialiser les couleurs de la barre de navigation avec la section affichée
    let currentIndex = $("section:not(.hidden)").index();
    updateNavColors(currentIndex);

    // Ajouter la classe active à la première icône
    $("nav i").eq(0).addClass("active");
  }
});
