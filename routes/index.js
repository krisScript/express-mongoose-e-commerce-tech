const express = require('express')
const router = express.Router();


const indexRouter  = require('../controllers/index')
router.get('/', indexRouter.getIndexPage);

module.exports = router;
