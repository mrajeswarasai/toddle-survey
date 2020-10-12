const express = require('express');

const { resize } = require("./controls");
const Multer = require('multer');

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 50 * 1024 * 1024 // no larger than 50mb, you can change as needed.
    }
});


const router = express.Router();

router.post('/resize', multer.single('file'), resize);

module.exports = router;