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

// Set Intervals Messages
// Tells the Viewers to say !hello to the lonely bot
const helloCommandInterval = setInterval(() => {
    client.action('epistemicpolymath', 'Say Hello to polymathicalbot with: !hello');
}, 600000);

// Set interval for !commands
const commandsCommandInterval = setInterval(() => {
    client.action('epistemicpolymath', 'View available bot commands: !commands');
}, 900000);

// Set interval so the viewers know where to submit comments about he stream
const serveyCommandInterval = setInterval(() => {
    client.action('epistemicpolymath', 'Help improve the stream!: !comments ');
}, 1200000);

// When a chat action happens
client.on('chat', (channel, user, message, self) => {
    // Do not listen to my own bot messages
    if (self) return;

    // Say hello to the user that uses the !hello command
    if (message === '!hello' && user['mod'] === false) {
        client.action('epistemicpolymath', `Hey, ${user[`display-name`]}!`);
    }

    // Say hello and thank a user that is a mod that uses !hello command
    if (message === '!hello' && user['mod'] === true) {
      client.action('epistemicpolymath', `Hey, ${user[`display-name`]}! Thank you for being an awesome mod :D`);
    }

    // Github Link for the Bot
    if (message === "!github") {
        client.action('epistemicpolymath', 'https://github.com/EpistemicPolymath/PolymathicalBot');
    }

    // if (message === "!polygithub") {
    //     client.action('epistemicpolymath', 'https://github.com/EpistemicPolymath');
    // }

    // LeaderBoards Commands
    // Jak 1 Leaderboard
    if (message === '!jak1boards') {
        client.action('epistemicpolymath', 'https://www.speedrun.com/jak1');
    }
    // Jak 1 100% Boards
    if (message === '!hundoboards') {
      client.action('epistemicpolymath', 'https://www.speedrun.com/jak1#100');
    }

    // Gives invite link for the Jak Speedruns Discord
    if (message === '!jakdiscord') {
        client.action('epistemicpolymath', 'https://discord.gg/HUzXuNn');
    }

    // Jak Debug command - links to more information about debug
    if (message === '!jakdebug') {
        client.action('epistemicpolymath', 'https://jadtech.miraheze.org/wiki/Debug_Mode');
    }

    // Links to the GitHub list of commands for the bot
    if(message === "!commands") {
        client.action('epistemicpolymath', 'http://bit.ly/polymathicalcommands');
    }

    // Links to a Google Form so viewers can give comments / stream suggestions
    if (message === "!comments") {
        client.action('epistemicpolymath', 'https://forms.gle/EKQygWHEdAoaKd4t9');
    }

});
