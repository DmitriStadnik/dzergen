const Timer = require("../models/Timer").Timer;

const getTimers = (callback) => {
  Timer.find().exec((err, items) => {
    if (err) return console.error(err);
    callback && callback(items);
  });
}

const setTimer = (action, hours, minutes, repeatNeeded, repeatAmount) => {
  const t = new Timer({
    action,
    hours,
    minutes,
    start: Date.now(),
    repeat: {
      status: repeatNeeded,
      amount: repeatAmount
    },
  });

  t.save(function (err) {
    if (err) return console.error(err);
    console.log(`timer ${action} added`);
  });
}

const deleteTimer = (id) => {
  Timer.deleteOne({ _id: id }, (err) => {
    if (err) return console.error(err);
  });
}

const updateTimer = (timer, hours, minutes, repeatDelta) => {
  timer.start = Date.now();
  timer.hours = hours;
  timer.minutes = minutes;

  if (timer.repeat.amount !== null && repeatDelta !== null) {
    timer.repeat.amount -= repeatDelta;
  }

  timer.save();
}

const timerAction = (timer) => {
  const actions = require("../utils/timerActions");
  actions[timer.action]();
  console.log(`timer id ${timer._id} action ${timer.action} done`);
}

const checkTimers = () => {
  const hour = 3600000;
  const minute = 60000;

  getTimers((items) => {
    items.forEach((item) => {
      let date = new Date(item.start);
      let now = Date.now();

      let targetDate = date.getTime() + (item.minutes * minute) + (item.hours * hour);

      if (now > targetDate) {
        timerAction(item);

        if (item.repeat.status) {
          if (item.repeat.amount !== null) {
            if (item.repeat.amount > 0) {
              updateTimer(item, item.hours, item.minutes, 1)
            } else {
              deleteTimer(item._id);
            }
          } else {
            updateTimer(item, item.hours, item.minutes, null)
          }
        } else {
          deleteTimer(item._id);
        }
      }
    });
  });
}

module.exports = {
  getTimers,
  setTimer,
  deleteTimer,
  updateTimer,
  timerAction,
  checkTimers
};