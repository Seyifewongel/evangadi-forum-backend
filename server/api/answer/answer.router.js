const { addAnswer, getAnswer } = require('./answer.controller');

const router = require('express').Router();

router.post('/', addAnswer)
router.post('/all', getAnswer)

module.exports = router;