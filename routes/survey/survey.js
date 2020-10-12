const express = require('express');

const {
    create,
    addQuestion,
    takeSurvey,
    answerSurvey,
    viewResults
} = require('./controls');

const {
    verifyToken,
    verifyUserWithToken,
} = require('../auth/helper');

const router = express.Router();

router.post('/create', verifyToken, verifyUserWithToken, create);
router.post('/add/:surveyId', verifyToken, verifyUserWithToken, addQuestion);
router.get('/takesurvey/:surveyId', verifyToken, verifyUserWithToken, takeSurvey);
router.post('/ans/:surveyId', verifyToken, verifyUserWithToken, answerSurvey);
router.get('/viewResults/:surveyId', verifyToken, verifyUserWithToken, viewResults);

module.exports = router;