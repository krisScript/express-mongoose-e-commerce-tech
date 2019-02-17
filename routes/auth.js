const express = require('express');
const { body } = require('express-validator/check');
const User = require('../models/user');
const router = express.Router();

const authController = require('../controllers/auth');

router.get('/sign-up', authController.getSignUp);
router.post(
  '/sign-up',
  body('username', 'User Name should be atlest 4 characters long')
    .isLength({ min: 4 })
    .isString()
    .trim()
    .custom((username, { req }) => {
      return User.findOne({ username }).then(userDoc => {
        if (userDoc) {
          return Promise.reject('User Name is already taken');
        }
      });
    }),
  body('email', 'Please enter valid email!')
    .isEmail()
    .custom((email, { req }) => {
      return User.findOne({ email }).then(userDoc => {
        if (userDoc) {
          return Promise.reject(
            'Email is already used,please user another one'
          );
        }
      });
    }),
  body('password', 'Please enter password that is  atleast 8 characters long ')
    .isLength({ min: 8 })
    .isAlphanumeric()
    .trim(),
  body('matchPassword')
    .trim()
    .isLength({ min: 8 })
    .isAlphanumeric()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords have to match!');
      }
      return true;
    }),
  authController.postSignUp
);
router.post('/login', authController.postLogin);
router.get('/login', authController.getLogin);
router.get('/logout', authController.getLogout);

module.exports = router;
