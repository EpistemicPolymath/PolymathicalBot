// CSV-Writer Initiation
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'notes.csv', // the file path to the notes.csv file is relative to the root directory of the project and not the file it is being called from
  header: [
    {id: 'username', title: 'Viewer'},
    {id: 'noteContent', title: 'Note'},
  ]
});

// !note {content} command
/*
  Code to make !note command only available to mods and broadcaster
  && ( user['mod'] === true || user['badges-raw'].includes("broadcaster"))

  It is now set so that so that anyone can leave notes. Will change if necessary.
 */
const notesCommand = (message, user) => {
    if (message.includes("!note")) {
      const noteRegex = /(!note)\s(.+)/;
      if (noteRegex.test(message)) {
        const noteArray = noteRegex.exec(message);
      /*  Will give an array of the note contents
         0: "!note" "{note contents}"
         1: "!note"
         2: "{note contents}"
      */

     // The records
     const note = [
        {username: user['display-name'], noteContent: noteArray[2].trim()}
     ];

     // Write to the file
     csvWriter
      .writeRecords(note) // Creates a Promise
      .then(() => console.log('The note was saved successfully, Thank you :D'))
      .catch((error => console.log(error)));
      return 'The note was saved successfully, Thank you :D';
    } else {
         return '!note command not formatted properly try again';
    }

  }
}

module.exports = notesCommand;
