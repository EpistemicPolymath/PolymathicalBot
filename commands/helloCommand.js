// Say hello to the user that uses the !hello command
const helloCommand = (message, user) => {
  if (message === '!hello' && user['mod'] === false && !user['badges-raw'].includes("broadcaster")) {
      return `Hey, ${user[`display-name`]}!`;
    }

    // Say hello and thank a user that is a mod that uses !hello command
    if (message === '!hello' && user['mod'] === true && !user['badges-raw'].includes("broadcaster")) {
      return `Hey, ${user[`display-name`]}! Thank you for being an awesome mod :D`;
    }

    // Message to braodcaster
    if (message === '!hello' && user['badges-raw'].includes("broadcaster")) {
      return `Hey ${user[`display-name`]}! Thank you for being an awesome broadcaster!`
    }
}

module.exports = helloCommand;
