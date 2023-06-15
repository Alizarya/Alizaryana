// Sélectionner le formulaire
const contactForm = document.getElementById("contactForm");

// Ajouter un écouteur d'événement pour la soumission du formulaire
contactForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Empêcher le comportement par défaut de rechargement de la page

  // Récupérer les valeurs des champs du formulaire
  const name = document.getElementById("name").value;
  const entreprise = document.getElementById("entreprise").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Créer l'objet contenant les données du formulaire
  const formData = {
    name: name,
    entreprise: entreprise,
    email: email,
    message: message,
  };

  // Envoyer les données du formulaire à l'API via une requête POST
  fetch("http://localhost:5000/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      // Traiter la réponse de l'API ici
      console.log(data);
      const returnedMessage = document.getElementById("returnedMessage");
      returnedMessage.innerText = data.message;
      // Réinitialiser le formulaire si nécessaire
      contactForm.reset();
    })
    .catch((error) => {
      console.log(
        "Une erreur s'est produite lors de l'envoi des données :",
        error
      );
    });
});
