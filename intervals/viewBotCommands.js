// Set interval for !commands
const viewBotCommands = setTimeout(() => { setInterval(() => {
    client.action('epistemicpolymath', 'View available bot commands: !commands');
}, 900000);
}, 180000);

module.exports = viewBotCommands;
