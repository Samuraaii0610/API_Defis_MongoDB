// controller.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel'); // Importez votre modèle utilisateur si vous en avez un

// Fonction pour gérer l'inscription d'un nouvel utilisateur
const register = async (pseudo, password, role) => {
  // Vérifiez d'abord si l'utilisateur existe déjà dans la base de données
  const existingUser = await User.findOne({ pseudo });
  if (existingUser) {
    throw new Error('Un utilisateur avec ce pseudo existe déjà.');
  }

  // Hash du mot de passe avant de l'enregistrer dans la base de données
  const hashedPassword = await bcrypt.hash(password, 10);

  // Créez un nouvel utilisateur dans la base de données avec le rôle spécifié
  const newUser = await User.create({ pseudo, password: hashedPassword, role });

  // Retournez les données du nouvel utilisateur
  return newUser;
};

const login = async (pseudo, password) => {
  try {
    // Recherche de l'utilisateur dans la base de données par son pseudo
    const user = await User.findOne({ pseudo });
    if (!user) {
      console.log(`Utilisateur ${pseudo} non trouvé.`);
      throw Error('Utilisateur non trouvé.');
    }

    console.log(`Utilisateur ${pseudo} trouvé. Comparaison des mots de passe...`);

    // Vérification du mot de passe
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(`Le mot de passe fourni est ${passwordMatch ? 'correct' : 'incorrect'}.`);

    if (!passwordMatch) {
      throw new Error('Mot de passe incorrect.');
    }

    // Génération du token JWT avec le rôle de l'utilisateur
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);

    console.log(`Token généré : ${token}`);

    // Retourner le token JWT et le rôle de l'utilisateur
    return { token, role: user.role };
  } catch (error) {
    console.log(`Erreur lors de la connexion : ${error.message}`);
    throw new Error('Erreur lors de la connexion : ' + error.message);
  }
};

// Importez votre modèle de données de défi
const Defi = require('../models/defiSchema');

// Fonction pour récupérer un défi aléatoire
const getRandomDefi = async () => {
  // Logique pour récupérer un défi aléatoire
  // Vous devez implémenter cette logique en fonction de votre modèle de données
  const randomDefi = await Defi.findOneRandom();
  if (!randomDefi) {
    throw new Error('Aucun défi trouvé.');
  }
  return randomDefi;
};

// Fonction pour récupérer plusieurs défis aléatoires
const getRandomDefis = async (count) => {
  // Logique pour récupérer plusieurs défis aléatoires en utilisant $sample
  // Vous devez implémenter cette logique en fonction de votre modèle de données
  const randomDefis = await Defi.aggregate([
    { $sample: { size: parseInt(count) } }
  ]);

  if (randomDefis.length === 0) {
    throw new Error('Aucun défi trouvé.');
  }

  return randomDefis;
};


// Fonction pour ajouter un défi
const addDefi = async (defiData) => {
  // Logique pour ajouter un défi
  // Vous devez implémenter cette logique en fonction de votre modèle de données
  const newDefi = await Defi.create(defiData);
  return newDefi;
};

// Fonction pour modifier un défi
const updateDefi = async (id, newData) => {
  // Logique pour modifier un défi
  // Vous devez implémenter cette logique en fonction de votre modèle de données
  const updatedDefi = await Defi.findByIdAndUpdate(id, newData, { new: true });
  if (!updatedDefi) {
    throw new Error('Défi non trouvé.');
  }
  return updatedDefi;
};

// Fonction pour supprimer un défi
const deleteDefi = async (id) => {
  // Logique pour supprimer un défi
  // Vous devez implémenter cette logique en fonction de votre modèle de données
  const deletedDefi = await Defi.findByIdAndDelete(id);
  if (!deletedDefi) {
    throw new Error('Défi non trouvé.');
  }
};

module.exports = {
    register,
    login,
    getRandomDefi,
    getRandomDefis,
    addDefi,
    updateDefi,
    deleteDefi
  };
