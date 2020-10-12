const Joi = require('joi');

const RegisterValidation = data => {
    const schema = Joi.object({
        username: Joi.string()
            .min(8)
            .max(255)
            .required(),
        password: Joi.string()
            .min(8)
            .max(1024)
            .required(),
    });
    try {
        const value = schema.validateAsync(data);
        return value
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    RegisterValidation
};