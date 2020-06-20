const getStartTime = () => {
  var envar = require("envar");
  envar.import('env.json');
  const client_id = envar('client-id');
  const accessToken = envar('access-token');

  // New Twitch API
  const querystring = require("querystring"),
    fetch = require("node-fetch");

  const streams_url = "https://api.twitch.tv/helix/streams";

  // JSON objects - These are the custom query strings for the streams request
  const qs = querystring.stringify({
        // first: 1
        user_id: "92433498"
  });

  // Template Strings used to make the streams URL w/ our custom query strings
  const qURL = `${streams_url}?${qs}`;

  // Adds the client id as a header for the fetch
  const fetchArgs = {
      headers: {
          "Client-ID": client_id,
          "Authorization": "Bearer " + accessToken
      }
  };


  // Final fetch API call
  fetch(qURL, fetchArgs)
      .then(response => response.json()) // Get JSON Response
      .then(data => startTime = new Date(data.data[0].started_at)) // View the Retrieved Data
      .catch(error => console.error(error)); // Catch any Errors

    setTimeout(() => {
        if (typeof startTime === "undefined") {
            return undefined;
        }
        return startTime;
    }, 4000);
}

module.exports = getStartTime;
