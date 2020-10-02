const mongoose = require('mongoose');
const config = require("config");

//database uri
const mongoURI = config.get('mongoURI');

//connect to the database
mongoose
    .connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => console.log("Depart database connected!!!"))
    .catch(err => console.log(err));

// make depart schema
const DepartSchema = new mongoose.Schema({
    user_id:{
        type: Number,
        required: true
    },
    school:{
        type: String,
        required: true,
    },
    department:{
        type: String,
        required: true
    }
   
});

const Depart = mongoose.model('Depart', DepartSchema);

module.exports = Depart;