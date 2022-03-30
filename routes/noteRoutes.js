const express = require('express')
const noteControllers = require('../controllers/noteControllers')

const router = express.Router()


router.route('/')
    .get(noteControllers.getAllNotes)
    .post(noteControllers.createNote)

router.route('/:id')
    .get(noteControllers.getNote)
    .delete(noteControllers.deleteNote)

router.get('/read', noteControllers.readFile)
router.get('/test', noteControllers.test)


module.exports = router;
