const express = require("express");
const router = require('./routes');
const morgan = require("morgan");
const app = express();

//middleware
app.use(express.json());
app.use(morgan("dev"));

//routes for user
app.use(router);
//app.use('/auth', require('./routes/authenticate'));

//port to listen
const port = process.env.PORT || 5000;

//listen to local host server
app.listen(port, () =>{
    console.log(`Listening to the server at port ${port}.`);
});