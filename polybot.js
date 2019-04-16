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
    // Do not listen to your own bot messages
    if (self) return;

    // Say hello to the user that uses the !hello command
    if (message === '!hello') {
        client.action('epistemicpolymath', `Hey, ${user[`display-name`]}!`);
    }

    // setInterval(() => {
    //     client.action('epistemicpolymath', 'Say Hello to polymathicalbot with: !hello');
    // }, 6000);
});
