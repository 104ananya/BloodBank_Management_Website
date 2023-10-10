const express = require('express')
const { testController } = require('../controllers/testController')

// router object -- this will put all functionality of Router part of express into router variable
const router = express.Router()

// routes
router.get('/', testController)

//export
module.exports = router;