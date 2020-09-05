const router = require('express').Router();
const Librarian = require('../models/user_db');
const Book = require('../models/book_db');
const User = require('../models/user_db');
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

//get books
router.get('/dashboard', (req, res) =>{
    Book.find()
        .sort({date: -1})
        .then(books => res.json(books))
});

//post book
router.post('/dashboard', (req, res) =>{
    const {title, isbn, author, publisher} = req.body;

    const newBook = new Book({
        title,
        isbn,
        author,
        publisher
    });
    newBook.save()
        .then(book => res.json(book));
});

//delete book
router.delete('/dashboard/:id', (req, res) =>{
    Book.findById(req.params.id)
        .then(item => item.remove()
            .then(() => res.json({success: true}))
        ).catch(err => res.status(404).json({success: false}));
});

//get user
router.get('/users', (req, res) =>{
    User.find()
        .sort({date: -1})
        .then(users => res.json(users))
})

//delete user
router.delete('/users/:id', (req, res) =>{
    User.findById(req.params.id)
        .then(item => item.remove()
            .then(() => res.json({success: true}))
        ).catch(err => res.status(404).json({success: false}));
});


module.exports = router;