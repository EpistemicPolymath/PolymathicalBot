// Envar For Storing Environmental Variables
var envar = require("envar");
envar.import('env.json');
const auth = envar('oauth');

const tmi = require('twitch-js');
// To Actually run and test the bot: node index.js

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

    // if (message === "!polygithub") {
    //     client.action('epistemicpolymath', 'https://github.com/EpistemicPolymath');
    // }

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

    // !note {content} command
    if (message.trim().includes("!note") && ( user['mod'] === true || user['badges-raw'].includes("broadcaster"))) {
        // console.log(user);
        const noteRegex = /(!note)\s{1}(\b((?!=|\,|\.).)+(.){1,}\b)/;
        if (noteRegex.test(message.trim())) {
          const noteArray = noteRegex.exec(message.trim());
        /*  Will give an array of the note contents
           0: "!note" "{note contents}"
           1: "!note"
           2: "{note contents}"
        */
       console.log(noteArray);
        console.log(noteArray[1]);
        console.log(noteArray[2]);
       // The records
       const note = [
          {username: user['display-name'], noteContent: noteArray[2].trim()}
       ];

       // Write to the file
       csvWriter
        .writeRecords(note)
        .then(() =>   client.action('epistemicpolymath', 'The note was saved successfully, Thank you :D'));

      } else {
          client.action('epistemicpolymath', '!note command not formatted properly try again');
      }

    }

});
