const express = require("express");
const router = require('./routes');
const morgan = require("morgan");

const app = express();

//middleware
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use(router);

//port to listen
const port = process.env.PORT || 8000;

//listen to local host server
app.listen(port, () =>{
    console.log(`Listening to the server at port ${port}.`);
});


