const express = require('express');

const {
    login
} = require('./controls');

const {
    verifyToken,
    verifyUserWithToken,
} = require('./helper');

const router = express.Router();

router.post('/login', login);

module.exports = router;