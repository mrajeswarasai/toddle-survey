const db = require('../../database');
const {
    createValidation,
    questionValidation
} = require('./surveyValidation');

exports.create = async(req, res, next) => {
    console.log(req.body);
    const validatedData = createValidation(req.body);
    if (validatedData.error)
        return res
            .status(400)
            .json({ message: validatedData.error.details[0].message });
    // console.log("owner:\t", req.loggedUser[0].userId);
    try {
        let create = `INSERT INTO survey (ownerId, surveyname) VALUES (?,?)`;
        let createParams = [req.loggedUser[0].userId, req.body.surveyname];
        let after = `SELECT * FROM survey WHERE surveyname=? and ownerId=?`;
        let afterParams = [req.body.surveyname, req.loggedUser[0].userId];
        db.serialize(function() {
            db.all(create, createParams, (err) => {
                if (err) {
                    console.log(err)
                }
            })
            db.all(after, afterParams, (err, survey) => {
                if (err) {
                    console.log(err)
                } else {
                    // console.log(survey);
                    res.status(200)
                        .json({ surveyId: survey[0].surveyId, surveyname: survey[0].surveyname, ownerId: survey[0].ownerId, message: "Survey successfully created !!" });
                }
            })
        })

    } catch (error) {
        res.status(400).json({ message: error });
    }
}


exports.addQuestion = async(req, res, next) => {
    console.log(req.body);
    console.log(req.params.surveyId);
    const validatedData = questionValidation(req.body);
    if (validatedData.error)
        return res
            .status(400)
            .json({ message: validatedData.error.details[0].message });

    try {
        let newQ = `INSERT INTO question (surveyId, qdetails) VALUES (?,?)`;
        let newQParams = [req.params.surveyId, req.body.question];
        let after = `SELECT * FROM question WHERE surveyId=?`;
        let afterParams = [req.params.surveyId];

        db.serialize(function() {
            db.all(newQ, newQParams, (err) => {
                if (err) {
                    console.log(err);
                }
            })
            db.all(after, afterParams, (err, data) => {
                if (err) {
                    console.log(err)
                } else {
                    // console.log(data);
                    res.status(200)
                        .json({
                            message: "Question successfully added !!",
                            data: data
                        });
                }
            })
        })

    } catch (error) {
        console.log(error)
    }
}

exports.takeSurvey = async(req, res, next) => {
    const getSurvey = `SELECT questionId, qdetails FROM question WHERE surveyId=?`;
    const getSurveyParams = [req.params.surveyId];
    console.log(getSurveyParams);
    try {
        db.all(getSurvey, getSurveyParams, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                console.log(data);
                res.status(200)
                    .json({
                        message: "Question successfully added !!",
                        data: data
                    });
            }
        })
    } catch (error) {
        console.log(error);
    }

}

exports.answerSurvey = async(req, res, next) => {
    console.log(req.body);
    for (var ans in req.body.data) {
        // console.log(req.body.data[ans].questionId);
        // console.log(req.body.data[ans].ans);
        const sanswer = `UPDATE question SET sresponse = sresponse+1 WHERE questionId = ?`;
        const sanswerParams = [req.body.data[ans].questionId];
        const nanswer = `UPDATE question SET nresponse = nresponse+1 WHERE questionId = ?`;
        const nanswerParams = [req.body.data[ans].questionId];


        if (req.body.data[ans].ans == "true") {
            try {
                db.all(sanswer, sanswerParams, (err) => {
                    if (err) {
                        console.log(err);
                    }
                })
            } catch (error) {
                console.log(error)
            }

        }
        if (req.body.data[ans].ans == "false") {
            try {
                db.all(nanswer, nanswerParams, (err) => {
                    if (err) {
                        console.log(err);
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }
    }
    res.status(200)
        .json({
            message: "Survey successfully answered !!",
        });

}

exports.viewResults = async(req, res, next) => {
    const questions = `SELECT * FROM question WHERE surveyId=?`;
    const questionsParams = [req.params.surveyId];
    try {
        db.serialize(function() {
            db.all(questions, questionsParams, (err, quest) => {
                if (err) {
                    console.log(error);
                } else {
                    const results = quest
                    res.status(200)
                        .json({
                            results: results
                        });
                }
            })
        })
    } catch (error) {
        console.log(error)
    }
}