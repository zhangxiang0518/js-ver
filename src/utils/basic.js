/*
 * @Author: Tyler Tianyi Liu
 * @Date: 2023-10-21 19:38:19
 * @LastEditTime: 2023-11-03 17:06:01
 * @Version: 0.1
 */

// get viewport size
function getViewportSize() {
  var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  // this.vw = viewportWidth;
  // this.vh = viewportHeight
  return [viewportWidth, viewportHeight]
}

// update viewport size data while window resizes
// and recalculate notification drawer width(%)
function updateViewportSize() {
  const vw = getViewportSize()[0];
  return calDrawerSize(vw);
}

// calculate drawer size(%) based on viewport width
function calDrawerSize(vw) {
  var drawerWidth;
  if (vw < 576) {
    drawerWidth = "75%"
  } else if (vw >= 576 && vw < 768) {
    drawerWidth = "60%"
  } else if (vw >= 768 && vw < 992) {
    drawerWidth = "55%"
  } else if (vw >= 992 && vw < 1200) {
    drawerWidth = "40%"
  } else if (vw >= 1200 && vw < 1600) {
    drawerWidth = "35%"
  } else {
    drawerWidth = "30%"
  }
  return drawerWidth;
}

/**
 * @description: get today's date
 * @return {String} yyyy-mm-dd
 */
function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Adding 1 as month is zero-based
  const day = String(today.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

/**
 * @description: get date string of specific days ago
 * @param {String} days how many days ago
 * @return {String} yyyy-mm-dd
 */
function getDateDaysAgo(days) {
  const today = new Date();
  const daysAgo = new Date(today.getTime() - days * 24 * 60 * 60 * 1000); // Subtracting milliseconds for input days

  const year = daysAgo.getFullYear();
  const month = String(daysAgo.getMonth() + 1).padStart(2, '0'); // Adding 1 as month is zero-based
  const day = String(daysAgo.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export {
  calDrawerSize, updateViewportSize, getViewportSize, getTodayDate, getDateDaysAgo
}
