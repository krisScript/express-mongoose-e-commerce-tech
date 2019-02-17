module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash( 'Please log in to view that resource');
  res.redirect('/login');
};
