const { createQuestion, getAllquestions, getQuestion } = require('./question.controller');

const router = require('express').Router();

router.post('/', createQuestion);
router.get('/', getAllquestions);
router.post('/id', getQuestion)

module.exports = router;