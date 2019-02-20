exports.getIndexPage = (req,res,next) => {
  let message = req.flash('error');
  let errorMessage = false
  if(message){
    errorMessage = message[0]
  }
    res.render('index', {
    user: req.user,
    title:'Home',
    path: '/',
    errorMessage
  })
}