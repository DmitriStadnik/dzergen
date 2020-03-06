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
  price: Number,
  alive: Boolean,
  owner: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Dzerdan = mongoose.model('Dzerdan', DzerdanSchema);

module.exports = {
  Dzerdan: Dzerdan
}