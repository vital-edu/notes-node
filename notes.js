const fs = require('fs');

console.log('Starting notes.js');

var fetchNotes = () => {
  try {
    return JSON.parse(fs.readFileSync('notes-data.json'));
  } catch(err) {
    return [];
  }
}

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

var addNote = (title, body) => {
  var notes = fetchNotes();

  var note = {
    title,
    body
  };

  var duplicateNotes = notes.filter((note) => note.title === title);
  
  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;       
  }
};

var getAll = () => {
  console.log('Getting all notes');
}

var getNote = (title) => {
  var notes = fetchNotes();
  note = notes.filter((note) => title === note.title);
  return note[0]; 
};

var deleteNote = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => title !== note.title);
  saveNotes(filteredNotes);

  return (filteredNotes.length !== notes.length); 
};

var logNote = (note, message = 'Note Details') => {
  console.log(message);
  console.log('---');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
}

module.exports = {
  addNote,
  getAll,
  getNote,
  deleteNote,
  logNote,
}
