const Joi = require('joi');

const createValidation = data => {
    const schema = Joi.object({
        surveyname: Joi.string()
            .min(8)
            .max(1024)
            .required(),
    })
    try {
        const value = schema.validateAsync(data);
        return value;
    } catch (err) {
        console.log(err);
    }
}

const questionValidation = data => {
    const schema = Joi.object({
        question: Joi.string()
            .min(10)
            .max(102400)
            .required(),
    })
    try {
        const value = schema.validateAsync(data);
        return value;
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    createValidation,
    questionValidation
}