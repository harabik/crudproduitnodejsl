const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');



router.post('/register', authController.register);
router.post('/register_client', authController.register_client);
router.post('/login', authController.login);
router.get('/logout', authController.logout);


module.exports = router;