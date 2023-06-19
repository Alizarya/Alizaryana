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

    // Initialiser les couleurs de la barre de navigation avec la section actuellement affichée
    let currentIndex = $("section:not(.hidden)").index();
    updateNavColors(currentIndex);
  }
});
