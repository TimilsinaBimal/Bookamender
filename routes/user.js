const router = require('express').Router();
const User = require('../models/user_db');
const Book = require('../models/book_db');
const Loan = require('../models/loan_db');
const Borrowed = require('../models/borrowed_db');
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
                            user:{
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

router.get('/dashboard', (req, res) =>{
    Book.find()
        .sort({average_rating: -1})
        .then(books => res.json(books))
})

// router.get('/books/:category', (req, res) =>{
//     console.log(category)
//     Book.find({category: req.params.category})
//       .then(books => res.json(books))
// })

router.get('/books', async (req, res) =>{
    const searchKeyword = req.query.searchKeyword
    ? {
        original_title:{
            $regex: req.query.searchKeyword,
            $options: 'i'
        },
    } : {};

    const books = await Book.find({...searchKeyword});
    res.json(books);
})

router.get('/book/:id', async (req, res) =>{
        const book = await Book.find({_id: req.params.id});
        res.json(book);
    })

router.post('/book/:id', async (req, res) =>{
    const id = req.body.id;
    const book = await Book.findById(id);
    const newLoan = new Loan({
        book_id: book.book_id,
        books_count: book.books_count,
        isbn: book.isbn,
        authors: book.authors,
        original_publication_year: book.original_publication_year,
        original_title: book.original_title,
        average_rating: book.average_rating
    });
    newLoan.save();
});

router.get('/loan', (req, res) =>{
    Loan.find()
        .then(loan => res.json(loan));
})

router.delete('/loan/:id', (req, res) =>{
    Loan.findById(req.params.id)
        .then(item => item.remove()
            .then(() => res.json({success: true}))
        ).catch(err => res.status(404).json({success: false}));
});

router.post('/loan', async (req, res) => {
    try{
    const book = await Loan.findById(req.body.id);
    const newBorrowed = new Borrowed({
        book_id: book.book_id,
        books_count: book.books_count,
        isbn: book.isbn,
        authors: book.authors,
        original_publication_year: book.original_publication_year,
        original_title: book.original_title,
        average_rating: book.average_rating
    });
    newBorrowed.save();
    } catch(error){
        console.log(error);
    }
});

router.get('/borrowed', (req, res) =>{
    Borrowed.find()
        .then(books => res.json(books));
})


module.exports = router;