// Envar For Storing Environmental Variables
var envar = require("envar");
envar.import('env.json');
const auth = envar('oauth');

const tmi = require('twitch-js');
// To Actually run and test the bot: node index.js


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

// When a chat action happens
client.on('chat', (channel, user, message, self) => {
    // Do not listen to my own bot messages
    if (self) return;

    // Say hello to the user that uses the !hello command
    if (message === '!hello') {
        client.action('epistemicpolymath', `Hey, ${user[`display-name`]}!`);
    }

    // Say hello and thank a user that is a mod that uses !hello command
    if (message === '!hello' && user['mod'] === true) {
      client.action('epistemicpolymath', `Hey, ${user[`display-name`]}! Thank you for being an awesome mod :D`);
    }

    // Set Intervals Messages
    const helloCommandInterval = setInterval(() => {
        client.action('epistemicpolymath', 'Say Hello to polymathicalbot with: !hello');
    }, 300000);

    // Github Link for the Bot
    if (message === "!github") {
        client.action('epistemicpolymath', 'https://github.com/EpistemicPolymath/PolymathicalBot');
    }

    // LeaderBoards Commands
    // Jak 1 Leaderboard
    if (message === '!jak1boards') {
        client.action('epistemicpolymath', 'https://www.speedrun.com/jak1');
    }
    if (message === '!hundoboards') {
      client.action('epistemicpolymath', 'https://www.speedrun.com/jak1#100');
    }

});
