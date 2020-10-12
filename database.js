var sqlite3 = require('sqlite3').verbose()
const DBSOURCE = "db.sqlite"


let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQlite database.')
        const users = `CREATE TABLE IF NOT EXISTS users (userId INTEGER PRIMARY KEY AUTOINCREMENT,username text UNIQUE,password text,CONSTRAINT username_unique UNIQUE (username))`;
        const survey = `CREATE TABLE IF NOT EXISTS survey (surveyId INTEGER PRIMARY KEY AUTOINCREMENT, ownerId INTEGER NOT NULL, surveyname text UNIQUE, FOREIGN KEY (ownerId) REFERENCES users(userId))`;
        const question = `CREATE TABLE IF NOT EXISTS question (questionId INTEGER PRIMARY KEY AUTOINCREMENT, surveyId INTEGER NOT NULL, qdetails text, sresponse INTEGER DEFAULT 0, nresponse INTEGER DEFAULT 0, FOREIGN KEY (surveyId) REFERENCES survey(surveyId))`;
        const response = `CREATE TABLE IF NOT EXISTS response (userId INTEGER NOT NULL, surveyId INTEGER NOT NULL, PRIMARY KEY (userId, surveyId), FOREIGN KEY (userId) REFERENCES user(userId), FOREIGN KEY (surveyId) REFERENCES survey(surveyId))`;
        db.serialize(function() {
            db.exec('PRAGMA foreign_keys = ON;', function(error) {
                if (error) {
                    console.error("Pragma statement didn't work.")
                } else {
                    console.log("Foreign Key Enforcement is on.")
                }
            });
            db.run(users, (error) => {
                if (error) {
                    // Table already created
                    console.log(error);
                }
            })
            db.run(survey, (error) => {
                if (error) {
                    // Table already created
                    console.log(error);
                }
            })
            db.run(question, (error) => {
                if (error) {
                    // Table already created
                    console.log(error);
                }
            })
            db.run(response, (error) => {
                if (error) {
                    // Table already created
                    console.log(error);
                }
            })
        })
    }
})



module.exports = db