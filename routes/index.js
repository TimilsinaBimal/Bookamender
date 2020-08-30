const express = require("express");
const router = express.Router();

router.use('/user', require('./user'));
router.use('/librarian', require('./librarian'));

module.exports = router;