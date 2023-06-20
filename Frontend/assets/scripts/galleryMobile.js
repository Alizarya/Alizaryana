$(document).ready(function () {
  if (window.matchMedia("(max-width: 48em)").matches) {
    const galleryContainer = document.getElementById("gallery-container");

    const apiUrl = "http://localhost:5000/creations";

    function shuffleArray(array) {
      const newArray = array.slice();
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const creations = shuffleArray(data);

        for (let i = 0; i < creations.length; i++) {
          const image = document.createElement("img");
          const imageUrl =
            "http://localhost:5000" + creations[i].image.replace(".", "");
          image.src = imageUrl;
          image.alt = creations[i].alt;
          galleryContainer.appendChild(image);
        }
      })
      .catch((error) => {
        console.log(
          "Une erreur s'est produite lors de la récupération des données :",
          error
        );
      });
  }
});
