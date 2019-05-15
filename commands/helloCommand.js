// Say hello to the user that uses the !hello command
const helloCommand = (message, user) => {
  if (message !== "!hello") {
    return;
  }

  // If just a regular user without any badges
  if (!user['badges-raw']) {
    return `Hey, ${user[`display-name`]}!`;
  }

  // If the user is a mod
  if (user['mod'] === true) {
    return `Hey, ${user[`display-name`]}! Thank you for being an awesome mod :D`;
  }

  // If the user is the broadcaster
  if (
    user['badges-raw'] &&
    user['badges-raw'].includes("broadcaster")
  ) {
    return `Hey ${user[`display-name`]}! Thank you for being an awesome broadcaster!`;
  }
}

module.exports = helloCommand;
