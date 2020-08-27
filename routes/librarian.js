const router = require('express').Router();
const Librarian = require('../models/user_db');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//librarian login
router.post('/librarian/login', (req, res) =>{
    const {email, password} = req.body;

    //validation
    if(!email || !password){
        return res.status(400).json({msg: "Please enter all the fields."});
    }

    if(password.length < 6){
        return res.status(400).json({msg:"Password must have at least 6 characters."});
    }

    //check if the user exists
    Librarian.findOne({email})
        .then(librarian =>{
            if(!librarian) return res.status(400).json({msg: "User doesnot exist"});

           // bcrypt: validate password
           bcrypt.compare(password, librarian.password)
            .then(isMatch =>{
                if(!isMatch) return res.status(400).json({msg:'Invalid user'});

                jwt.sign(
                    {id: librarian.id },
                    config.get('jwtSecret'),
                    {expiresIn: 3600}, 
                    (err, token) =>{
                        if(err) throw err;
                        res.json({
                            token,
                            librarian: {
                            id: librarian.id,
                            name: librarian.name,
                            email: librarian.email
                            }
                        })
                    }
                )
            })
        })
});

module.exports = router;