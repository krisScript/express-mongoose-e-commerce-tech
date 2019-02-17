exports.getIndexPage = (req,res,next) => {
  console.log(req.user)
    res.render('index', {
    user: req.user,
    title:'Home',
    path: '/home',
  })
}