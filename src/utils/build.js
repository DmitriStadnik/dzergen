function launch () {
  const generateNamesArray = require('./build/names');
  const generateTraitsArray = require('./build/traits');

  generateNamesArray();
  generateTraitsArray();
}

module.exports = launch;
