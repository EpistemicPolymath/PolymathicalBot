// Initialize getStartTime function
const getStartTime = require('../helpers/getStartTime.js');


// Uptime command
const uptimeCommand = (message, startTime) => {
    if (message === "!uptime") {
      // // Check if startTime is defined
      if (typeof startTime === "undefined") {
        getStartTime();
        return "The stream startTime is not defined yet";
      }
      // Calculate the uptime using fetched variable and current time
      // Current Date and Time
      let now = new Date();
      // https://stackoverflow.com/questions/4944750/how-to-subtract-date-time-in-javascript
      let dateDiff = now - startTime; // milliseconds
      console.log("Current Date", now);
      console.log("Stream Start Date", startTime);
      console.log("Difference", dateDiff);
      let seconds = dateDiff / 1000;
      let minutes = Math.trunc(seconds / 60);
      let hours = Math.floor(minutes / 60);
      return `EpistemicPolymath has been streaming for ${hours} hour(s) and ${minutes % 60} minute(s)`;
  }
}

module.exports = uptimeCommand;
