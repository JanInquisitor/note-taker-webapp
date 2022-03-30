const express = require('express')
const viewControllers = require('../controllers/viewControllers')

const router = express.Router()

router.get('/', viewControllers.mainPage)
router.get('/notes', viewControllers.notePage)


module.exports = router