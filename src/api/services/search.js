const Redis = require("ioredis");
/**
 *
 * @param {String} searchType
 * @param {String} searchText
 */

const { default: axios } = require("axios");

const generateUrl = require("../../helpers/generateUrl");

const redisClient = new Redis();
const DEFAULT_EXPIRATION = 7200;
/**
 *
 * @param {String} searchType
 * @param {String} searchText
 * @param {Object} searchData
 */
const cacheSearchResult = (searchType, searchText, searchData) => {
  redisClient.setex(
    `${searchType}-${searchText}`,
    DEFAULT_EXPIRATION,
    JSON.stringify(searchData)
  );
};
/**
 *
 * @param {String} searchType
 * @param {String} searchText
 */

const getSearchResult = async (searchType, searchText) => {
  //Generate URL
  const url = generateUrl(searchType, searchText);
  console.log("URl ::", url);
  //Get the request
  try {
    const response = await axios.get(url);
    //Cash the result
    cacheSearchResult(searchType, searchText, response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
/**
 *
 * @param {String} searchType
 * @param {String} searchText
 * @returns
 */
const getCachedSearchResult = async (searchType, searchText) => {
  try {
    const cachedData = await redisClient.get(`${searchType}-${searchText}`);
    if (cachedData) return JSON.parse(cachedData);
    return await getSearchResult(searchType, searchText);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { getCachedSearchResult };
