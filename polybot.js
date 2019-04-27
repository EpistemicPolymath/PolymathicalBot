// Envar For Storing Environmental Variables
var envar = require("envar");
envar.import('env.json');
const auth = envar('oauth');
const client_id = envar('client-id');

const tmi = require('twitch-js');
// To Actually run and test the bot: node index.js

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

// CSV-Writer Initiation
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'notes.csv',
  header: [
    {id: 'username', title: 'Viewer'},
    {id: 'noteContent', title: 'Note'},
  ]
});


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

// Set Intervals Messages
// Tells the Viewers to say !hello to the lonely bot
const helloCommandInterval = setInterval(() => {
    client.action('epistemicpolymath', 'Say Hello to polymathicalbot with: !hello');
}, 600000);

// Set interval for !commands
const commandsCommandInterval = setTimeout(() => { setInterval(() => {
    client.action('epistemicpolymath', 'View available bot commands: !commands');
}, 900000);
}, 180000);

const serveyCommandInterval = setTimeout(() => { setInterval(() => {
    client.action('epistemicpolymath', 'Help improve the stream!: !comments ');
}, 1200000);
}, 120000);

// When a chat action happens
client.on('chat', (channel, user, message, self) => {
    // Do not listen to my own bot messages
    if (self) return;

    // Say hello to the user that uses the !hello command
    if (message.trim() === '!hello' && user['mod'] === false) {
        client.action('epistemicpolymath', `Hey, ${user[`display-name`]}!`);
    }

    // Say hello and thank a user that is a mod that uses !hello command
    if (message.trim() === '!hello' && user['mod'] === true) {
      client.action('epistemicpolymath', `Hey, ${user[`display-name`]}! Thank you for being an awesome mod :D`);
    }

    // Github Link for the Bot
    if (message.trim() === "!github") {
        client.action('epistemicpolymath', 'https://github.com/EpistemicPolymath/PolymathicalBot');
    }

    // My personal GitHub Link
    if (message.trim() === "!polygithub") {
        client.action('epistemicpolymath', 'https://github.com/EpistemicPolymath');
    }

    // LeaderBoards Commands
    // Jak 1 Leaderboard
    if (message.trim() === '!jak1boards') {
        client.action('epistemicpolymath', 'https://www.speedrun.com/jak1');
    }
    // Jak 1 100% Boards
    if (message.trim() === '!hundoboards') {
      client.action('epistemicpolymath', 'https://www.speedrun.com/jak1#100');
    }

    // Gives invite link for the Jak Speedruns Discord
    if (message.trim() === '!jakdiscord') {
        client.action('epistemicpolymath', 'https://discord.gg/HUzXuNn');
    }

    // Jak Debug command - links to more information about debug
    if (message.trim() === '!jakdebug') {
        client.action('epistemicpolymath', 'https://jadtech.miraheze.org/wiki/Debug_Mode');
    }

    // Links to the GitHub list of commands for the bot
    if(message.trim() === "!commands") {
        client.action('epistemicpolymath', 'http://bit.ly/polymathicalcommands');
    }

    // Links to a Google Form so viewers can give comments / stream suggestions
    if (message.trim() === "!comments") {
        client.action('epistemicpolymath', 'https://forms.gle/EKQygWHEdAoaKd4t9');
    }

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

    // !note {content} command
    /*
      Code to make !note command only available to mods and broadcaster
      && ( user['mod'] === true || user['badges-raw'].includes("broadcaster"))

      It is now set so that so that anyone can leave notes. Will change if necessary.
     */
    if (message.trim().includes("!note")) {
        const noteRegex = /(!note)\s(.+)/;
        if (noteRegex.test(message.trim())) {
          const noteArray = noteRegex.exec(message.trim());
        /*  Will give an array of the note contents
           0: "!note" "{note contents}"
           1: "!note"
           2: "{note contents}"
        */

       // The records
       const note = [
          {username: user['display-name'], noteContent: noteArray[2].trim()}
       ];

       // Write to the file
       csvWriter // Creates a Promise
        .writeRecords(note)
        .then(() =>   client.action('epistemicpolymath', 'The note was saved successfully, Thank you :D'));

      } else {
          client.action('epistemicpolymath', '!note command not formatted properly try again');
      }

    }

});
