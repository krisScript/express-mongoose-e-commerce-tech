exports.getIndexPage = (req,res,next) => {
  let message = req.flash('error');
  let errorMessage = false
  if(message){
    console.log(message)
    errorMessage = message[0]
  }
  console.log(req.user)
    res.render('index', {
    user: req.user,
    title:'Home',
    path: '/home',
    errorMessage
  })
}