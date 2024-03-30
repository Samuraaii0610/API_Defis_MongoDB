const mongoose = require('mongoose');

const defiSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  difficulte: {
    type: String,
    enum: ['facile', 'moyen', 'difficile'],
    default: 'moyen'
  },
  points: {
    type: Number,
    required: true
  },
  categorie: {
    type: String,
    required: true
  },
  dateCreation: {
    type: Date,
    default: Date.now
  }
});

defiSchema.statics.findOneRandom = async function () {
  const count = await this.countDocuments();
  const random = Math.floor(Math.random() * count);
  return this.findOne().skip(random);
};

defiSchema.statics.findRandom = async function (count) {
  const defis = await this.aggregate([{ $sample: { size: parseInt(count) } }]);
  return defis;
};

module.exports = mongoose.model('Defi', defiSchema);
