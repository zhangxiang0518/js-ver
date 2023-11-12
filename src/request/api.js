/*
 * @Author: Tyler Tianyi Liu
 * @Date: 2023-10-21 15:17:12
 * @LastEditTime: 2023-11-02 23:43:10
 * @Version: 0.1
 */

// import from http.js
import { get, del, put, post } from './http'

// head of the weather api
const weatherApiHead = "http://api.weatherapi.com/v1/";

// *required* weather api key
const weatherApiKey = "?key=f0e5fe2c3fd94ab7bd552156230211";

// auto ip lookup string
const autoIPString = "&q=auto:ip"

// const localhost = "http://localhost:8080";
// const herokuhost = "https://loveinhome.herokuapp.com";

// example APIs
const userAPI = {
  getAllUser: () => {
    return get('/api/user', undefined)
  },
  getUserByID: (id) => {
    return get('/api/user/' + id, undefined)
  },
  addUser: (param) => {
    return post('/api/user', param)
  },
  updateUser: (id, param) => {
    return put('/api/user/' + id, param)
  },
  deleteUser: (id) => {
    return del('/api/user/' + id, undefined)
  },
}

/**
 * @description weather api
 */
const weatherAPI = {

  /**
   * @description Get historical weather data for a specific date range of a city
   * @param {String} cityName - The name of the city for which historical weather data is requested. Use 'undefined' to get data based on the user's IP.
   * @param {String} startDate - The start date for historical weather data.
   * @param {String} endDate - The end date for historical weather data.
   * @return {Object} - Historical weather data object
   */
  getCityHistoryWeather: (cityName, startDate, endDate) => {
    const startQuery = "&dt=" + startDate;
    const endQuery = "&end_dt=" + endDate;

    const url = weatherApiHead + 'history.json' + weatherApiKey +
      (cityName === undefined ? (autoIPString + startQuery + endQuery) : (`&q=${cityName}` + startQuery + endQuery));

    return get(url, undefined)
  },

  /**
   * @description Get current weather data for a specific city along with optional Air Quality Index (AQI) data
   * @param {String} cityName - The name of the city for which current weather data is requested. Use 'undefined' for city name based on IP address.
   * @param {Boolean} aqi - Indicates whether to include Air Quality Index data or not.
   * @return {Object} - Weather data object
   */
  getCurrentWeather: (cityName, aqi) => {
    aqi = aqi ? '&aqi=yes' : '&aqi=no';

    // Construct the URL based on conditions using template literals
    const url = weatherApiHead + 'current.json' + weatherApiKey +
      (cityName === undefined ? (autoIPString + aqi) : (`&q=${cityName}` + aqi));

    return get(url, undefined);
  }
}

export default {
  userAPI, weatherAPI
};
