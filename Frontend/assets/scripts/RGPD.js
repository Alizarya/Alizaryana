// Sélectionner l'élément RGPD
const rgpdElement = document.getElementById("RGPD");

// Fonction pour ouvrir le popup
function openPopup() {
  // Dimensions du popup
  const popupWidth = 1100;
  const popupHeight = 500;

  // Calculer les coordonnées pour centrer le popup
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const popupLeft = (screenWidth - popupWidth) / 2;
  const popupTop = (screenHeight - popupHeight) / 2;

  // Créer le popup
  const popup = window.open(
    "",
    "Popup",
    `width=${popupWidth},height=${popupHeight},left=${popupLeft},top=${popupTop}`
  );

  // Charger le contenu du popup avec les styles CSS
  popup.document.write(`
    <html>
      <head>

        <style>
          body {
            background-color: #551860;
          }
          h1 {
            font-family: var(--oswald);
            color: #ffce2f;
            text-transform: uppercase;
            font-size: 36px;
          }
          p {
            font-family: var(--roboto);
            font-size: 24px;
            color: #e4cae9;
          }
        </style>

      </head>

      <body>
        <h1>Mentions légales sur l'utilisation de vos données</h1>
        <p>Les informations recueillies vous concernant font l’objet d’un traitement destiné à AlizaryAna.</p>
        <p>Pour la finalité suivante : répondre à votre message.</p>
        <p>La durée de conservation des données est d'autant de temps que necessitera les échanges.</p>
        <p>Vous bénéficiez d’un droit d’accès, de rectification, de portabilité, d’effacement de celles-ci ou une limitation du traitement.</p>
        <p>Vous pouvez vous opposer au traitement des données vous concernant et disposez du droit de retirer votre consentement à tout moment en vous adressant à AlizaryAna.</p>
        <p>Vous avez la possibilité d’introduire une réclamation auprès d’une autorité de contrôle.</p>
      </body>
    </html>
  `);
}

// Au clic sur l'élément RGPD
rgpdElement.addEventListener("click", openPopup);
