const mongoose = require("mongoose");

const DzerdanSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  dateCreated: Date,
  name: [String],
  nameStr: String,
  image: String,
  words: [String],
  stats: {
    vitality: Number,
    strength: Number,
    arse: Number,
    intellect: Number
  },
  rarity: Number,
  alive: Boolean,
  owner: mongoose.Schema.Types.ObjectId,
  createdBy: mongoose.Schema.Types.ObjectId,
});

const Dzerdan = mongoose.model('Dzerdan', DzerdanSchema);

module.exports = {
  Dzerdan: Dzerdan
}