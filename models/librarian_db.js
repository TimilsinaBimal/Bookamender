const mongoose = require('mongoose');
const config = require("config");

//database uri
const mongoURI = config.get('mongoURI');

//connect to the database
mongoose
    .connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => console.log("Librarian database connected!!!"))
    .catch(err => console.log(err));

//librarian schema
const LibrarianSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
});

const Librarian = mongoose.model('Librarian', LibrarianSchema);

module.exports = Librarian;