// Envar For Storing Environmental Variables
var envar = require("envar");
envar.import('env.json');
const auth = envar('oauth');
const client_id = envar('client-id');

const tmi = require('twitch-js');
// To Actually run and test the bot: node index.js

// Importing intervals and functions
let intervals = [
    'sayHelloToPolyBot',
    'viewBotCommands',
    'helpImproveStream'
];

let intervalFunctions = intervals.map((interval) => {
    return require(`./intervals/${interval}.js`);
});

let commands = [
    'helloCommand',
    'githubCommand',
    'polyGithubCommand',
    'jak1BoardsCommand',
    'hundoBoardsCommand',
    'jakDiscordCommand',
    'jakDebugCommand',
    'retroCapCardCommand',
    'addMeDiscordCommand',
    'getCommandsCommand',
    'commentsCommand',
    'notesCommand',
];

let commandFunctions = commands.map((command) => {
    return require(`./commands/${command}.js`);
});


// New Twitch API
const querystring = require("querystring"),
  fetch = require("node-fetch");

const streams_url = "https://api.twitch.tv/helix/streams";

// JSON objects - These are the custom query strings for the streams request
const qs = querystring.stringify({
      user_id: "92433498"
});

// Template Strings used to make the streams URL w/ our custom query strings
const qURL = `${streams_url}?${qs}`;

// Adds the client id as a header for the fetch
const fetchArgs = {
    headers: {
        "Client-ID": client_id
    }
};

// Final fetch API call
fetch(qURL, fetchArgs)
    .then(response => response.json()) // Get JSON Response
    .then(data => startTime = new Date(data.data[0].started_at)) // View the Retrieved Data
    .catch(error => console.error(error)); // Catch any Errors


// ChatBot Configuration Options
const options = {
    options: {
        debug: true
    },
    connection: {
        cluster: 'aws',
        reconnect: true
    },
    identity: {
        username: 'PolymathicalBot',
        password: auth
    },
    channels: [
      'epistemicpolymath'
    ]
};

//New instance of the client with setup options
const client = new tmi.client(options);

// Allows the client to connect to Twitch
client.connect();

// When the client is on or connected say this
client.on('connected', (address, port) => {
    client.action('epistemicpolymath', 'Hey there, PolymathicalBot is now connected!');
});

// Interval Messages
setInterval(() => {
  /**
   * Math.floor() - rounds the number down to nearest whole number
   * Math.random() - generates a random decimal number if we multiply that random decimal number by a whole number we can get a range 0 - (num-1)
   * We can use this to get a random whole number the contains a range of the length of our interval functions including zero
   */
    let index = Math.floor(Math.random() * intervalFunctions.length);
    client.action('epistemicpolymath', intervalFunctions[index]());
}, 600000); // Every 10 minutes run a random command


// When a chat action happens
client.on('chat', (channel, user, message, self) => {
    // Do not listen to my own bot messages
    if (self) return;

    // Trim All Incoming Messages
    let trimmedMessage = message.trim();

    // Send command functions necessary values
    commandFunctions.forEach((command) => {
      if (typeof command === "function") {
        let response = command(trimmedMessage, user, channel);
          if(response){
              client.action('epistemicpolymath', response);
          }
      }
    });

    // Uptime command
    if (message.trim() === "!uptime") {
        // Calculate the uptime using fetched variable and current time
        // Current Date and Time
        let now = new Date();
        // https://stackoverflow.com/questions/4944750/how-to-subtract-date-time-in-javascript
        let dateDiff = now - startTime; // milliseconds
        console.log(now);
        console.log(startTime);
        console.log(dateDiff);
        let seconds = dateDiff / 1000;
        let minutes = Math.trunc(seconds / 60);
        let hours = Math.floor(minutes / 60);
        client.action('epistemicpolymath', `EpistemicPolymath has been streaming for ${hours} hour(s) and ${minutes % 60} minute(s)`);
    }



});
