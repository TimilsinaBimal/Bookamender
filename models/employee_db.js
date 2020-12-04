const mongoose = require('mongoose');
const config = require("config");

//database uri
const mongoURI = config.get('mongoURI');

//connect to the database
mongoose
    .connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => console.log("User database connected!!!"))
    .catch(err => console.log(err));

// make employee schema
const EmployeeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;