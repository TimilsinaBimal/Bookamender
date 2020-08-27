const express = require("express");
const bodyParser = require("body-parser");
const user_route = require('./routes/user');
const librarian_route = require('./routes/librarian');
const morgan = require("morgan");
const app = express();

//middleware
app.use(bodyParser.json());
app.use(morgan("dev"));

//routes for user
app.use('/user', user_route);
app.use('/librarian', librarian_route);
//app.use('/auth', require('./routes/authenticate'));

//port to listen
const port = process.env.PORT || 5000;

//listen to local host server
app.listen(port, () =>{
    console.log(`Listening to the server at port ${port}.`);
});