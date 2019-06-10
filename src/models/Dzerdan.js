var mongoose = require("mongoose");

var DzerdanSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  dateCreated: Date,
  name: [String],
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

var Dzerdan = mongoose.model('Dzerdan', DzerdanSchema);

module.exports = {
  Dzerdan: Dzerdan
}