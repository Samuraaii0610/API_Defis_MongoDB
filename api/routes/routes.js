// routes.js

const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');
const { isAdmin } = require('../middleware/isAdmin');
const auth = require('../middleware/auth');

// Route pour l'inscription
router.post('/register', async (req, res) => {
  try {
    const { pseudo, password, role } = req.body; // Ajoutez le champ role ici
    const newUser = await controller.register(pseudo, password, role); // Ajoutez le champ role lors de l'appel à la fonction register
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Route pour la connexion
router.post('/login', async (req, res) => {
  try {
    const { pseudo, password } = req.body;
    console.log("Tentative de connexion avec les informations d'identification suivantes : ", pseudo, password);
    const { token, role } = await controller.login(pseudo, password); // Récupérez le rôle ici
    res.json({ token, role }); // Incluez le rôle dans la réponse
  } catch (error) {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Route pour récupérer un défi aléatoire
router.get('/defis/random', async (req, res) => {
  try {
    const defi = await controller.getRandomDefi();
    res.json(defi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route pour récupérer plusieurs défis aléatoires
router.get('/defis/randoms/:count', async (req, res) => {
  try {
    const count = req.params.count;
    const defis = await controller.getRandomDefis(count);
    res.json(defis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route pour ajouter un défi (accessible uniquement aux administrateurs)
router.post('/defis',auth, isAdmin, async (req, res) => {
  try {
    const newDefi = req.body;
    const defi = await controller.addDefi(newDefi);
    res.status(201).json(defi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route pour modifier un défi (accessible uniquement aux administrateurs)
router.put('/defis/:id',auth, isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const newData = req.body;
    const updatedDefi = await controller.updateDefi(id, newData);
    res.json(updatedDefi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route pour supprimer un défi (accessible uniquement aux administrateurs)
router.delete('/defis/:id',auth,  isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    await controller.deleteDefi(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

