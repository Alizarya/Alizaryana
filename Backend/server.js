// Import du framework
const fastify = require("fastify")({ logger: true });

// Import des éléments pour les fichiers statiques
const path = require("path");
const fastifyStatic = require("@fastify/static");

// Import des controllers
const creationsCtrl = require("./controllers/creations");
const contactCtrl = require("./controllers/contact");

// Gestion du cors
const fastifyCors = require("@fastify/cors");
fastify.register(fastifyCors, {
  origin: "*", // a modifier lors de la mep
  methods: ["GET", "POST"],
});

// Sécuriser contre le DDoS
const fastifyRateLimit = require("@fastify/rate-limit");

// Route GET pour récupérer mes créations
fastify.get("/creations", async (request, reply) => {
  const creations = creationsCtrl.getCreations();
  reply.send(creations);
});

fastify.register(fastifyStatic, {
  root: path.join(__dirname, "images"),
  prefix: "/images/", // Préfixe de l'URL pour les fichiers statiques
});

// Route POST pour mon formulaire de contact
fastify.post("/contact", async (request, reply) => {
  try {
    const contact = await contactCtrl.sendEmail(request.body);
    reply.send(contact);
  } catch (error) {
    console.log(error);
    reply.status(500).send({
      error: "Une erreur s'est produite lors de l'envoi du message.",
    });
  }
});

// Redirection vers la page d'erreur

// Démarrage du serveur
const start = async () => {
  try {
    await fastify.listen({ port: 5000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log("Server running on port 5000");
};
start();
