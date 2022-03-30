const uuid = require('uuid')
const util = require('util');

const data = require('../utils/dataHandlers')
const catchAsync = require('../utils/catchAsync')

exports.getAllNotes = catchAsync(async (req, res, next) => {
    res.json(data.readJSON('db', 'db'))
    next()
})

exports.getNote = catchAsync(async (req, res, next) => {
    let notesArray = JSON.parse(data.read('db', 'db'))
    let newArray = [...notesArray]
    let selectedNote = newArray.filter(noteObject => noteObject['id'] === req.params.id)

    res.json(selectedNote)
    next()
});

exports.createNote = catchAsync(async (req, res, next) => {
    const {title, text} = req.body;
    let newNote, notesArray, newNotesArray = [];
    // validates if there is a new note
    if (!title || !text) throw new Error("Either the title or the text is missing.")

    // Create a new object by merging the req.body object with a new id object.
    newNote = Object.assign(req.body, {id: uuid.v1()})

    // Reads the existing notes array from the database and converts it from a literal string to a JavaScript array.
    notesArray = JSON.parse(data.read('db', 'db'))

    // Merges the existing notes Array with the newly created one
    newNotesArray = notesArray.concat(newNote)

    // This writes the new Array concatenated but not before parsing it with JSON.parse(notesArray)
    data.writeToFile('db', 'db.json', JSON.stringify(newNotesArray))

    res.json({message: "New note created!", data: newNotesArray})
    next()
});

exports.deleteNote = catchAsync(async (req, res, next) => {
    const id = req.params.id;

    // Pulls the array from the database and parses it to an array
    let notesArray = JSON.parse(data.read('db', 'db'))

    // Make a new array out of the old array to manipulate it
    let newNotesArray = [...notesArray]

    // Select the note with the id from te request
    let selectedNote = newNotesArray.find(noteObject => noteObject['id'] === id)
    if (selectedNote === undefined || !selectedNote) {
        throw new Error('Note not found!');
    }

    // Find the index of the note in the array
    let indexOfItemToBeDeleted = newNotesArray.indexOf(selectedNote)

    // Deletes the selected note.
    if (indexOfItemToBeDeleted > -1) {
        newNotesArray.splice(indexOfItemToBeDeleted, 1)
    }

    // This writes the new Array concatenated but not before parsing it with JSON.parse(notesArray)
    data.writeToFile('db', 'db.json', JSON.stringify(newNotesArray))

    res.json({
        message: "Note Deleted!",
        status: 204
    }).status(204)

    next()
});

exports.readFile = catchAsync(async (req, res, next) => {
    res.json(JSON.parse(data.read('db', 'db')));
    next()
})

exports.test = catchAsync(async (req, res, next) => {
    res.json({test: "Hello"}).status(200)

    next()
});