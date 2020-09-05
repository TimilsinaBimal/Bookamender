const mongoose = require('mongoose');
const config = require("config");

//database uri
const mongoURI = config.get('mongoURI');

//connect to the database
mongoose
    .connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => console.log("Database connected!!!"))
    .catch(err => console.log(err));

// make Books schema
const BookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    isbn:{
        type:String,
        required: true
    },
    author:{
        type:String,
        required: true
    },
    publisher:{
        type:String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;