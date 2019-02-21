const bcrypt = require('bcryptjs');
const passport = require('passport');
const { validationResult } = require('express-validator/check');
const User = require('../models/user');
exports.getSignUp = (req, res, next) => {
  res.render('auth/signup-login', {
    user: req.user,
    title: 'Home',
    path: '/sign-up',
    signup: true,
    errorMessage: false,
    validationErrors: [],
    oldInput: {
      userName: '',
      password: '',
      passwordMatch: '',
      email: ''
    }
  });
};
exports.postSignUp = async (req, res, next) => {
  const errors = validationResult(req);
  const { username, email, password ,matchPassword} = req.body;
  const user = new User({
    username,
    email,
    password
  });
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render('auth/signup-login', {
      path: '/sign-up',
      title: 'Signup',
      signup: true,
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email,
        password,
        matchPassword,
        username
      },
      validationErrors: errors.array()
    });
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, async (err, hash) => {
      try {
        user.password = hash;
        await user.save();
        res.redirect('/login');
      } catch (err) {
        console.log(error)
      }
    });
  });
};

exports.getLogin = (req, res, next) => {
 let errorMessage = false 
 let message = req.flash('error');
  if(message.length > 0){
    errorMessage = message

  }
  res.render('auth/signup-login', {
    user: req.user,
    title: 'Home',
    path: '/login',
    signup: false,
    errorMessage,
    validationErrors: []
  });
};
exports.postLogin = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
    errorMessage: 'message'
  })(req, res, next);
};
exports.getLogout = (req, res, nect) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/');
};
