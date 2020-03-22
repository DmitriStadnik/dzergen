function launch () {
  const generateNamesArray = require('./build/names');
  const generateTraitsArray = require('./build/traits');

  generateNamesArray();
  generateTraitsArray();

  // Temporary stuff
  const timerController = require('../controllers/Timer');

  timerController.checkTimers();
}

module.exports = launch;
