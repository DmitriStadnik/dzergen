const mongoose = require("mongoose");

const TimerSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  start: Date,
  action: String,
  hours: Number,
  minutes: Number,
  repeat: {
    status: Boolean,
    amount: Number
  },
});

const Timer = mongoose.model('Timer', TimerSchema);

module.exports = {
  Timer: Timer
}