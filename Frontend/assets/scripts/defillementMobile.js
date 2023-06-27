$(document).ready(function () {
  if (window.matchMedia("(max-width: 48em)").matches) {
    $("section:not(#accueil)").addClass("hidden");

    $("nav i").click(function () {
      // Récupérer l'index de l'icône cliquée
      let index = $(this).index();

      // Retirer la classe "active" de toutes les icônes
      $("nav i").removeClass("active");

      // Ajouter la classe "active" à l'icône cliquée
      $(this).addClass("active");

      // Afficher la section correspondante en fonction de l'index
      $("section").addClass("hidden");
      $("section").eq(index).removeClass("hidden");

      // Mettre à jour les couleurs de la barre de navigation
      updateNavColors(index);

      // Faire défiler vers le haut de la section
      let section = $("section").eq(index)[0];
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    });

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

    // Ajouter la classe "active" à la première icône par défaut
    $("nav i").eq(0).addClass("active");

    // Initialiser les couleurs de la barre de navigation avec la section actuellement affichée
    let currentIndex = $("section:not(.hidden)").index();
    updateNavColors(currentIndex);

    // Fonction pour afficher la section précédente
    function showPreviousSection() {
      let currentIndex = $("section:not(.hidden)").index();
      let previousIndex = (currentIndex - 3) % $("section").length;

      $("nav i").removeClass("active");
      $("nav i").eq(previousIndex).click();

      // Mettre à jour les couleurs de la barre de navigation
      updateNavColors(previousIndex);
      updateNavColors(nextIndex);

      // Faire défiler vers le haut de la section précédente
      let section = $("section").eq(previousIndex)[0];
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Fonction pour afficher la section suivante
    function showNextSection() {
      let currentIndex = $("section:not(.hidden)").index();
      let nextIndex = (currentIndex + 5) % $("section").length;

      $("nav i").removeClass("active");
      $("nav i").eq(nextIndex).click();

      // Mettre à jour les couleurs de la barre de navigation
      updateNavColors(nextIndex);
      updateNavColors(nextIndex);

      // Faire défiler vers le haut de la section suivante
      let section = $("section").eq(nextIndex)[0];
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Variables pour suivre les coordonnées du toucher
    let touchStartX = 0;
    let touchEndX = 0;

    // Écoute de l'événement touchstart
    $(document).on("touchstart", function (event) {
      touchStartX = event.originalEvent.touches[0].clientX;
    });

    // Écoute de l'événement touchend
    $(document).on("touchend", function (event) {
      touchEndX = event.originalEvent.changedTouches[0].clientX;

      // Calcul de la distance de glissement
      let swipeDistance = touchStartX - touchEndX;

      // Vérification si le glissement est vers la gauche
      if (swipeDistance > 150) {
        showNextSection();
      }

      // Vérification si le glissement est vers la droite
      if (swipeDistance < -150) {
        showPreviousSection();
      }
    });
  }
});
