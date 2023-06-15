// File System pour lire le fichier de data
const fs = require("fs");

// Récupération des données
const getCreations = () => {
  try {
    const data = fs.readFileSync("./data/creations.json", "utf8");
    const creations = JSON.parse(data).creations;
    return creations;
  } catch (error) {
    console.error("Error reading creations data:", error);
    return [];
  }
};

// Export
module.exports = {
  getCreations,
};
