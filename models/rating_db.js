const mongoose = require('mongoose');
const config = require("config");

//database uri
const mongoURI = config.get('mongoURI');

//connect to the database
mongoose
    .connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => console.log("Rating database connected!!!"))
    .catch(err => console.log(err));

// make depart schema
const RatingSchema = new mongoose.Schema({
    user_id:{
        type: Number,
        required: true
    },
    book_id:{
        type: Number,
        required: true,
    },
    rating:{
        type: Number,
        required: true
    }
   
});

const Rating = mongoose.model('Rating', RatingSchema);

module.exports = Rating;