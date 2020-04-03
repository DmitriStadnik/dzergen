import colors from "../components/Reusable/colors";

export default {
  imagePath: (img) => {
    return `/images/${img}`
  },
  getColor: (rarity = 0) => {
    switch (rarity) {
      case 0:
        return colors.border_grey;
      case 1:
        return colors.border_green;
      case 2:
        return colors.border_blue;
      case 3:
        return colors.border_purple;
      case 4:
        return colors.border_orange;
      default:
        return colors.border_grey;
    }
  },
  getBgColor: (rarity = 0) => {
    switch (rarity) {
      case 0:
        return colors.card_grey;
      case 1:
        return colors.card_green;
      case 2:
        return colors.card_blue;
      case 3:
        return colors.card_purple;
      case 4:
        return colors.card_orange;
      default:
        return colors.card_grey;
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
        return 'достопочтенный';
      case 4:
        return 'легендарный';
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
  },
  parseDate: (date) => {
    let d = new Date(date);

    let day = d.getDate();
    let month = d.getMonth() + 1;

    return `${day < 10 ? day = '0' + day : day}.${month < 10 ? month = '0' + month : month}.${d.getFullYear()}`;
  }
}