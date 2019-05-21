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

  // If the user has badges
  if (user['badges-raw']) {

      // If user has badges, but they are not a broadcaster / subscriber
      if (!user['badges-raw'].includes("broadcaster") ||
          !user['badges-raw'].includes("subscriber")
         ) {
          return `Hey ${user[`display-name`]}! Nice badge(s)!`;
      }

      // If the user is the broadcaster
      if (user['badges-raw'].includes("broadcaster")) {
          return `Hey ${user[`display-name`]}! Thank you for being an awesome broadcaster!`;
        // If the user is a subscriber
      } else if (user['badges-raw'].includes("subscriber")) {
          return `Hey ${user[`display-name`]}! Thank you for being a sub!`;
      }
    }
}

module.exports = helloCommand;
