const sharp = require('sharp');

exports.resize = async(req, res, next) => {
    const resizedImage = await sharp(req.file.buffer).png().resize(50, 50).toBuffer()
    res.status(200)
        .attachment('thumbnail.png')
        .body(resizedImage)
        .json({
            message: "Image successfully resized !!",
        });
}