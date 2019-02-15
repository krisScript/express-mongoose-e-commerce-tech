exports.getIndexPage = (req,res,next) => {
    res.render('index', {
    user: req.user,
    title:'Home',
    path: '/home',
  })
}