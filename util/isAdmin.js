module.exports = (req, res, next) => {
  if (req.isAuthenticated() && req.user.admin) {
    return next();
  }
  req.flash('error', 'You dont have the rights to see this content');
  res.redirect('/');
};
