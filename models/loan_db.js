const mongoose = require('mongoose');
const config = require("config");

//database uri
const mongoURI = config.get('mongoURI');

//connect to the database
mongoose
    .connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => console.log("Book database connected!!!"))
    .catch(err => console.log(err));

// make Loan schema
const LoanSchema = new mongoose.Schema({
    book_id:{
        type: Number,
        required: true
    },
    books_count:{
        type: Number,
        required: true
    },
    isbn:{
        type:String,
        required: true
    },
    authors:{
        type:String,
        required: true
    },
    original_publication_year:{
        type:String,
        required: true
    },
    original_title:{
        type:String,
        required: true
    },
    language_code:{
        type:String,
        default: 'eng'
    },
    rating_count:{
        type: Number,
        default: 20
    },
    average_rating:{
        type: Number,
        required: true
    },
    rating_1:{
        type: Number,
        default: 1
    }, 
    rating_2:{
        type: Number,
        default: 2
    }, 
    rating_3:{
        type: Number,
        default: 3
    }, 
    rating_4:{
        type: Number,
        default: 4
    }, 
    rating_5:{
        type: Number,
        default: 5
    },
    date:{
        type: Date,
        default: Date.now
    }
});

const Loan = mongoose.model('Loan', LoanSchema);

module.exports = Loan;