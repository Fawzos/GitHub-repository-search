const GITHUB_URL = "https://api.github.com/search/";
/**
 *
 * @param {String} searchType
 * @param {String} searchText
 */
module.exports = (searchType, searchText) => {
  return GITHUB_URL + searchType + "?q=" + searchText;
};
