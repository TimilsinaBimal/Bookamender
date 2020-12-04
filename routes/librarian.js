const router = require('express').Router();
const Librarian = require('../models/librarian_db');
const Book = require('../models/book_db');
const Journal = require('../models/journal_db');
const User = require('../models/user_db');
const Employee = require('../models/employee_db');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

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
    Librarian.findOne({email})
        .then(librarian =>{
            if(librarian) return res.status(400).json({msg: "User already exists"});

            const newLibrarian = new Librarian({
                name,
                email,
                password
            });

            //bcrypt operation: hash password and save user info in db.
            bcrypt.genSalt(10, (err, salt) =>{
                bcrypt.hash(newLibrarian.password, salt, (err, hash) =>{
                    if(err) throw err;
                    newLibrarian.password = hash;
                    newLibrarian.save()
                        .then(librarian =>{

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
            })
        })
});


//librarian login
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
                        // res.json({
                        //     token,
                        //     librarian: {
                        //     id: librarian.id,
                        //     name: librarian.name,
                        //     email: librarian.email
                        //     }
                        // })
                        res.json({
                                 token,
                                id: librarian.id,
                                name: librarian.name,
                                email: librarian.email
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
    const {book_id, books_count, isbn, authors, original_publication_year, original_title, average_rating} = req.body;

    const newBook = new Book({
        book_id, 
        books_count, 
        isbn, 
        authors, 
        original_publication_year, 
        original_title,  
        average_rating
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

router.get('/journals', (req, res) =>{
    Journal.find()
        .then(journals => res.json(journals))
});

//post journal
router.post('/journals', (req, res) =>{
    const {title, isbn} = req.body;

    const newJournal = new Journal({
        title,
        isbn
    });
    newJournal.save()
        .then(journal => res.json(journal));
});

//delete journal
router.delete('/journals/:id', (req, res) =>{
    Journal.findById(req.params.id)
        .then(item => item.remove()
            .then(() => res.json({success: true}))
        ).catch(err => res.status(404).json({success: false}));
});

//get user
router.get('/users', (req, res) =>{
    User.find()
        .sort({date: 1})
        .select('-password')
        .then(users => res.json(users))
})

//delete user
router.delete('/users/:id', (req, res) =>{
    User.findById(req.params.id)
        .then(item => item.remove()
            .then(() => res.json({success: true}))
        ).catch(err => res.status(404).json({success: false}));
});

//get employee
router.get('/employee', (req, res) =>{
    Employee.find()
        .then(employee => res.json(employee))
});

//post employee
router.post('/employee', (req, res) =>{
    const {name, email, address, phone} = req.body;

    const newEmployee = new Employee({
       name,
       email,
       address,
       phone
    });

    newEmployee.save()
        .then(employee => res.json(employee));
});

//delete employee
router.delete('/employee/:id', (req, res) =>{
    Employee.findById(req.params.id)
        .then(item => item.remove()
            .then(() => res.json({success: true}))
        ).catch(err => res.status(404).json({success: false}));
});



module.exports = router;