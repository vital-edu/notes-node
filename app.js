const fs = require('fs');
const yargs = require('yargs');

const notes = require('./notes')

var titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
}

var bodyOptions = {
  describe: 'Content of note',
  demand: true,
  alias: 'b'
}

const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('list', 'List all notes')
  .command('read', 'Show specific note', {
    title: titleOptions
  })
  .command('remove', 'Remove specific note', {
    title: titleOptions
  })
  .help()
  .argv;
var command = argv._[0];

if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body)
  if (note) {
    notes.logNote(note, 'Note created')
  } else {
    console.log(`Note could not be saved. Note with title '${argv.title}' already exists`);
  };
} else if (command === 'list') {
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s)`);
  allNotes.forEach((note, i) => notes.logNote(note, `\nNote ${i}`));
} else if (command === 'read') {
  var note = notes.getNote(argv.title);
  if (note) {
    notes.logNote(note, 'Note found')
  } else {
    console.log(`Note '${argv.title}' was not found`);
  }
} else if (command === 'remove') {
  var noteRemoved = notes.deleteNote(argv.title);
  console.log(noteRemoved);
  var message = `The note '${argv.title}' was ` + (noteRemoved ?  'removed' : 'not found');
  console.log(message);
} else {
  console.log('Command not recognized');
}
