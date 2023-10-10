const express = require('express')
const { registerController, loginController, currentUserController } = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

//routes
router.post('/register', registerController )
router.post("/login", loginController)
router.get("/current_user", authMiddleware, currentUserController)

module.exports = router