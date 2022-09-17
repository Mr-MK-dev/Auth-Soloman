const express = require('express')
const router = express.Router()
const authController = require('../controller/auth')

router.route('/register').post(authController.register)
router.route('/login').post(authController.login)
router.route('/update').put(authController.update)
router.route('/:id').delete(authController.deleteUser)
module.exports = router