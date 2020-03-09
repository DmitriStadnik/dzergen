const mongoose = require("mongoose");

const DzerdanSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  dateCreated: Date,
  name: [mongoose.Schema.Types.Mixed],
  traits: [mongoose.Schema.Types.Mixed],
  nameStr: String,
  image: String,
  alignment: Number,
  rarity: Number,
  price: Number,
  alive: Boolean,
  owner: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  kawaii: Boolean
});

const Dzerdan = mongoose.model('Dzerdan', DzerdanSchema);

module.exports = {
  Dzerdan: Dzerdan
}