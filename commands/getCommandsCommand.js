// Links to the GitHub list of commands for the bot
const getCommandsCommand = (message) => {
    if(message === "!commands") {
      return 'http://bit.ly/polymathicalcommands';
  }
}

module.exports = getCommandsCommand;
