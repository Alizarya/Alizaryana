// Sélectionnez l'icône du menu et la div du menu
const menuIcon = document.getElementById("menu-icon");
const menuDiv = document.querySelector(".menu");
const menuClose = document.getElementById("menu-icon-close");

// Au clic sur l'icone du menu, il descend
menuIcon.addEventListener("click", () => {
  menuDiv.style.transition = "top 0.8s ease-in-out";
  menuDiv.classList.add("show");
});

// Au clic sur l'icone de fermeture du menu, il remonte
menuClose.addEventListener("click", () => {
  menuDiv.classList.remove("show");
});

// GESTION DE L'ICONE TEAPOT
const teapot = document.getElementById("teapot");

// Au survol de la souris
teapot.addEventListener("mouseover", function () {
  this.src = "./assets/images/icones/teapot-jaune.png";
});

// Lorsque la souris quitte l'élément
teapot.addEventListener("mouseout", function () {
  this.src =
    "./assets/images/icones/teapot-black-side-view-shape-svgrepo-com.png";
});
