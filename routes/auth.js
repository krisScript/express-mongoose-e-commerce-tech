const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');

router.get('/sign-up', authController.getSignUp);
router.post('/signUp', authController.postSignUp);
router.post('/login', authController.postLogin);
router.get('/login', authController.getLogin);
router.get('/logout', authController.getLogout);

module.exports = router;
