'use strict'
const express = require('express');
const path = require('path');


const adminConfig  =  require('./middleware/adminConfig')

const errorController = require('./controllers/error');

const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const bodyParser = require('body-parser');
const csrf = require('csurf');
const flash = require('connect-flash');
const sassMiddleware = require('node-sass-middleware');
const randomstring = require('randomstring');
const multer = require('multer');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const fs = require('fs');
const passport = require('passport')
const app = express();
//Routers
const authRouter = require('./routes/auth')
const indexRouter = require('./routes/index')
const adminRouter = require('./routes/admin')
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
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${new Date().toISOString().replace(/:/g, '-')}` + '-' + file.originalname
    );
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};


app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

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

 adminConfig()


app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  if (!req.user) {
    res.locals.isAuthenticated = false;
    res.locals.isAdmin = false;
    return next();
  } else {
    res.locals.isAuthenticated = true;
    res.locals.isAdmin = false;
    if(req.user.admin){
      res.locals.isAdmin = true;
    }
   return next();
  }
});
process.on('unhandledRejection', (reason, p) => {
  console.log(reason)
});


app.use(indexRouter)
app.use(authRouter)
app.use('/admin',adminRouter)

app.use(errorController.get404);


const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));


