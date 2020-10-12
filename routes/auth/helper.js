const jwt = require("jsonwebtoken");
const db = require("../../database");


// verify the token for authentication
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers["authorization"];

    // Check if bearer is undefined
    if (typeof bearerHeader !== "undefined") {
        // Split the header
        const bearer = bearerHeader.split(" ");
        // Get the token
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;

        // run the next function
        next();
    } else {
        return res.status(401).json({ message: "Access Denied" });
    }
}

const verifyUserWithToken = async(req, res, next) => {
    // verifies the given token is correct and gets the user data
    jwt.verify(req.token, process.env.Token_Secret, async(err, authData) => {
        if (err) {
            console.log(`Error at verifying jwt token: ${err}`);
            return res.status(401).json({ message: err.message });
        } else {
            try {
                var findUser = `SELECT userId, username FROM users WHERE userId=?`;
                var findUser_params = [authData.userId];
                db.all(findUser, findUser_params, (error, loggedUser) => {
                    if (error) {
                        console.log(error);
                    } else {
                        // if user doesn't exist
                        if (!loggedUser) {
                            return res.status(400).json({
                                message: "No user exists with given id"
                            });
                        }

                        // when user exists
                        else {
                            req.loggedUser = loggedUser;
                            next();
                        }
                    }
                })
            } catch (error) {
                console.log(error);
                return res.status(500).json({ message: "Error finding user" });
            }
        }
    });
};

module.exports = { verifyToken, verifyUserWithToken };