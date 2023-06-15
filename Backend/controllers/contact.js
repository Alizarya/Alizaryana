// Importer le module nodemailer
const nodemailer = require("nodemailer");

// Charger la variable d'environnement
require("dotenv").config();

// Récupérer les informations d'authentification de Gmail depuis les variables d'environnement
const anaMail = process.env.ALIZARYANA_MAIL;
const anaPassword = process.env.ALIZARYANA_PASSWORD;

// Fonction pour envoyer l'e-mail
async function sendEmail(formData) {
  try {
    // Configuration du transporteur e-mail (SMTP)
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: anaMail,
        pass: anaPassword,
      },
    });

    // Options de l'e-mail à envoyer
    const mailOptions = {
      replyTo: formData.email,
      to: anaMail, // Adresse e-mail du destinataire
      subject: `[ALIZARYANA] Message de ${formData.name}`,
      text: `Nom: ${formData.name}\nOrga: ${formData.entreprise}\nE-mail: ${formData.email}\nMessage: ${formData.message}`,
    };

    // Envoi de l'e-mail
    const info = await transporter.sendMail(mailOptions);
    console.log("E-mail envoyé : " + info.response);
    return { success: true, message: "Votre message a bien été envoyé !" };
  } catch (error) {
    console.log(error);
    throw new Error(
      "Une erreur s'est produite lors de l'envoi du message. Veuillez rééssayer ultérieurement."
    );
  }
}

module.exports = { sendEmail };
