const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Défi', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connexion à MongoDB réussie'))
.catch((err) => console.error('Erreur de connexion à MongoDB :', err));
