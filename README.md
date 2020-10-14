# toddle-survey
Toddle Backend task

hosted at: [https://survey-app-083.herokuapp.com/](https://survey-app-083.herokuapp.com/)

### Step 1: Login

- Accepts any **username** and **password** in the form of JSON data.
- If username is new, it creates new entry in users table else ignores.
- Generated userId is used to sign JWT along with secret and send token back in form of authorization header.

## Token received is used to check for validity in all survey api's
- where **verifyToken** and **verifyUserWithToken** are used as middlewares.

### Step 2: Create Survey

- Decoded userId from token is used to identify who created the survey.
- Survey will have a **surveyname** and **questions** in JSON data.
- Questions is a seperate api, where any number of questions can be added into survey using that survey id. 
- Since answers can only be True and False, these values are not represented in table along with questions.

### Step 3: Get Survey

- Retrieve questions from the survey using surveyId.
- Includes survey object along with survey questions.

### Step 4: Take Survey

- All the questions/answers in a survey are sent as array in JSON data.
- Answers can only be 'True' or 'False'.

### Step 5: Get Survey Result

- Retrieve survey result using surveyId.
- Can see survey result of all users.

### Step 6: Get Thumbnail

- Get the PUBLIC url from the request JSON data.
- Image will be fetched from the url and create a buffer.
- Image is resized using sharp.
- Image is resized to 50x50 px.
- Can view resized image in [https://survey-app-083.herokuapp.com/image_thumb.jpeg](https://survey-app-083.herokuapp.com/image_thumb.jpeg)

Also included public directory where the files in that directiry can be accessed using url.
DB schema : [https://survey-app-083.herokuapp.com/db_schema.png](https://survey-app-083.herokuapp.com/db_schema.png)
