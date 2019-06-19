export default {
  imagePath: (img) => {
    return `/images/${img}`
  },
  getColor: (rarity = 0) => {
    switch (rarity) {
      case 0:
        return '#2e3131';
      case 1:
        return '#26a65b';
      case 2:
        return '#2c82c9';
      case 3:
        return '#663399';
      case 4:
        return '#f9690e';
      default:
        return '#2e3131';
    }
  },
  getBgColor: (rarity = 0) => {
    switch (rarity) {
      case 0:
        return '#ececec';
      case 1:
        return '#66cc99';
      case 2:
        return '#6bb9f0';
      case 3:
        return '#9b59b6';
      case 4:
        return '#fabe58';
      default:
        return '#ececec';
    }
  },
  parseRarity: (rarity) => {
    switch (rarity) {
      case 0:
        return 'рядовой';
      case 1:
        return 'бывалый';
      case 2:
        return 'закаленный в бою';
      case 3:
        return 'легендарный';
      case 4:
        return 'эпический';
      default:
        return 'что это за';
    }
  },
  composeFilters: (filters) => {
    let result = {};
    if (!filters) return result;
    if (filters.name !== '') result['name'] = filters.name;
    if (filters.rarity !== 5) result['rarity'] = filters.rarity;
    return result;
  }
}