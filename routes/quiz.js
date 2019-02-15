const { ensureAuthenticated } = require('../config/auth');
const express = require('express')
const { body } = require('express-validator/check');
const router = express.Router();


const quizController  = require('../controllers/quiz')
router.get('/new-quiz',ensureAuthenticated, quizController.getNewQuiz);

router.post('/quiz-results',[
body('number_questions',)
.custom((value, { req }) => {
   const {number_questions} = req.body
   const answers = Object.entries(req.body).filter(entry => {
           return typeof entry[1] === 'string' && entry[1] !== '' && entry[0] !== '_csrf' && entry[0] !== 'number_questions' && entry[0].split('-')[0] === 'answer'
       })
       if (number_questions.parseInt !== answers.length) {
        throw new Error('Plase answer all questions!');
      }
      return true;
  })
],ensureAuthenticated,quizController.postQuizResults)
module.exports = router;

