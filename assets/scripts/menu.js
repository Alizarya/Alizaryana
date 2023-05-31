// Sélectionnez l'icône du menu et la div du menu
const menuIcon = document.getElementById("menu-icon");
const menuDiv = document.querySelector(".menu");
const menuClose = document.getElementById("menu-icon-close");

// Au clic sur l'icone du menu, il descend
menuIcon.addEventListener("click", () => {
  menuDiv.classList.add("active");
});

// Au clic sur l'icone de fermeture du menu, il remonte
menuClose.addEventListener("click", () => {
  menuDiv.classList.remove("active");
});
