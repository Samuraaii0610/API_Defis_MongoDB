require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./api/routes/routes');
 // Assurez-vous d'avoir le bon chemin vers votre fichier de routes
const database = require('./database'); // Assurez-vous d'avoir le bon chemin vers votre fichier de connexion à la base de données

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Utilisation des routes définies dans le fichier routes
app.use('/api', routes);

// Port sur lequel le serveur écoute
const PORT = process.env.PORT || 3000;

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
