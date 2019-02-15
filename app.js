'use strict'
const express = require('express');
const path = require('path');

const sassMiddleware = require('node-sass-middleware');

const bodyParser = require('body-parser');
const errorController = require('./controllers/error');

const flash = require('flash')
const app = express();
const session = require('express-session');
const mongoose = require('mongoose')
const passport = require('passport');
const csrf = require('csurf');
//Routers
const authRouter = require('./routes/auth')
const indexRouter = require('./routes/index')
const dbKey = require('./config/keys').mongoURI;
mongoose
  .connect(
    dbKey,
    { useNewUrlParser: true }
  )


app.set('view engine', 'ejs');
const csrfProtection = csrf();
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
require('./config/passport')(passport);

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(passport.initialize());
app.use(passport.session());

process.on('unhandledRejection', (reason, p) => {
  console.log(reason)
});


app.use(indexRouter)
app.use(authRouter)

// app.use((error, req, res, next) => {
//   res.status(404).redirect('/404');
// });
// app.use(errorController.get404);


const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));


