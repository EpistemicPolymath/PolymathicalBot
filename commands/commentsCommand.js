// Links to a Google Form so viewers can give comments / stream suggestions
const commentsCommand = (message) => {
    if (message === "!comments") {
      return 'https://forms.gle/EKQygWHEdAoaKd4t9';
  }
}

module.exports = commentsCommand;
