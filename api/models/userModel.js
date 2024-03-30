// userModel.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  pseudo: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['administrator', 'user'], default: 'user' }
  // Autres champs utilisateur...
});

const User = mongoose.model('User', userSchema);

module.exports = User;
