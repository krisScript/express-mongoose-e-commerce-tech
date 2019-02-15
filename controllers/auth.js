const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/user');
exports.getSignUp = (req, res, next) => {
  res.render('auth/signup-login', {
    user: req.user,
    title: 'Home',
    path: '/home',
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
  const { userName, email, password } = req.body;
  if (user) {
    res.render('register', {
      errors,
      userName,
      email,
      password
    });
  } else {
    const newUser = new User({
      userName,
      email,
      password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        await newUser.save();
        req.flash('success_msg', 'You are now registered and can log in');
        res.redirect('/login');
      });
    });
  }
};

exports.getLogin = (req, res, next) => {
  res.render('auth/signup-login', {
    user: req.user,
    title: 'Home',
    path: '/home',
    signup: false,
    errorMessage: false,
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
