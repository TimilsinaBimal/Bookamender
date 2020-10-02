const express = require("express");
const router = express.Router();
const Book = require("../models/book_db");

router.use('/user', require('./user'));
router.use('/librarian', require('./librarian'));


module.exports = router;