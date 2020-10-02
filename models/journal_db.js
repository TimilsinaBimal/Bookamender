const mongoose = require('mongoose');
const config = require("config");

//database uri
const mongoURI = config.get('mongoURI');

//connect to the database
mongoose
    .connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => console.log("Journal database connected!!!"))
    .catch(err => console.log(err));

// make Journals schema
const JournalSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    isbn:{
        type:String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

const Journal = mongoose.model('Journal', JournalSchema);

module.exports = Journal;