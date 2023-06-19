$(document).ready(function () {
  if (window.matchMedia("(max-width: 48em)").matches) {
    $("section:not(#accueil)").addClass("hidden");

    $("nav i").click(function () {
      // Récupérer l'index de l'icône cliquée
      let index = $(this).index();

      // Afficher la section correspondante en fonction de l'index
      $("section").addClass("hidden");
      $("section").eq(index).removeClass("hidden");
    });
  }
});
