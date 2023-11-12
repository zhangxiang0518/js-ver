/*
 * @Author: Tyler Tianyi Liu
 * @Date: 2023-10-21 18:14:38
 * @LastEditTime: 2023-11-05 20:49:37
 * @Version: 
 */
import { defineStore } from 'pinia';

export const useSystemStore = defineStore({
  id: 'system', 

  state: () => ({
    userinfo: {},
    shouldUserListShow: 2,
    isDarkMode: false,
    currentWeatherData: undefined,
    historyWeatherData: undefined,
  }),

  getters: {
    get_userinfo: (state) => state.userinfo,
    get_shouldUserListShow: (state) => state.shouldUserListShow,
    get_isDarkMode: (state) => state.isDarkMode,
    get_currentWeatherData: (state) => state.currentWeatherData,
    get_historyWeatherData: (state) => state.historyWeatherData,
  },

  actions: {
    set_userinfo(userinfo) {
      this.userinfo = userinfo;
    },
    set_shouldUserListShow(shouldUserListShow) {
      this.shouldUserListShow = shouldUserListShow;
    },
    set_isDarkMode(isDarkMode){
      this.isDarkMode = isDarkMode;
    },
    set_currentWeatherData(currentWeatherData){
      this.currentWeatherData = currentWeatherData;
    },
    set_historyWeatherData(historyWeatherData){
      this.historyWeatherData = historyWeatherData;
    },
  },
});
