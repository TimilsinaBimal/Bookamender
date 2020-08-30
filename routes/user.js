const router = require('express').Router();
const User = require('../models/user_db');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

router.post('/login', (req, res) =>{
    const {email, password} = req.body;

    //validation
    if(!email || !password){
        return res.status(400).json({msg: "Please enter all the fields."});
    }

    if(password.length < 6){
        return res.status(400).json({msg:"Password must have at least 6 characters."});
    }

    //check if the user exists
    User.findOne({email})
        .then(user =>{
            if(!user) return res.status(400).json({msg: "User doesnot exist"});

           // bcrypt: validate password
           bcrypt.compare(password, user.password)
            .then(isMatch =>{
                if(!isMatch) return res.status(400).json({msg:'Invalid user'});

                jwt.sign(
                    {id: user.id },
                    config.get('jwtSecret'),
                    {expiresIn: 3600}, 
                    (err, token) =>{
                        if(err) throw err;
                        res.json({
                            token,
                            user: {
                            id: user.id,
                            name: user.name,
                            email: user.email
                            }
                        })
                    }
                )
            })
        })
});

router.post('/register', (req, res) =>{
    const {name, email, password} = req.body;

    //validation
    if(!name || !email || !password){
        return res.status(400).json({msg: "Please enter all the fields."});
    }

    if(password.length < 6){
        return res.status(400).json({msg:"Password must have at least 6 characters."});
    }

    //check if the user exists
    User.findOne({email})
        .then(user =>{
            if(user) return res.status(400).json({msg: "User already exists"});

            const newUser = new User({
                name,
                email,
                password
            });

            //bcrypt operation: hash password and save user info in db.
            bcrypt.genSalt(10, (err, salt) =>{
                bcrypt.hash(newUser.password, salt, (err, hash) =>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user =>{

                            jwt.sign(
                                {id: user.id },
                                config.get('jwtSecret'),
                                {expiresIn: 3600}, 
                                (err, token) =>{
                                    if(err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                        id: user.id,
                                        name: user.name,
                                        email: user.email
                                        }
                                    })
                                }
                            )
                            
                        })
                })
            })
        })
});

router.get('/auth', auth, (req, res) =>{
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
})

module.exports = router;