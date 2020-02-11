const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// User Model
const UserModel = require("../models/user");

// @route   POST /users
// @desc    Register new user
// @access  Public
router.post("/", (req, res, next) => {
    console.log("Register");
    const { id, name, surname, username, password } = req.body;
    console.log(name + " a username " + username + "id " + id);

    // Simple validation
    if (!name || !username || !password || !surname) {
        return res.status(400).json({ msg: "Please enter all fields" });
    }

    // Check for existing user
    UserModel.findOne({ username }).then(user => {
        if (user) return res.status(400).json({ msg: "User already exists" });

        const newUser = new UserModel({
            id,
            name,
            surname,
            username,
            password
        });

        // Create salt & hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save().then(user => {
                    jwt.sign({ id: user.id },
                        config.get("jwtSecret"), { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    surname: user.surname,
                                    password: user.password,
                                    username: user.username
                                }
                            });
                        }
                    );
                });
            });
        });
    });
});

// @route   GET /users
// @desc    Get all users
// @access  Public
router.get("/", (req, res, next) => {
    console.log("Usao sam");
    UserModel.find()
        .then(doc => {
            const data = doc;
            res.status(200).json(data);
        })
        .catch(err => console.log(err));
});

// @route   PUT /users/:id
// @desc    Update user
// @access  Public
router.put("/:id", (req, res, next) => {
    console.log("Usao sam");
    const id = req.params.id;
    const { name, surname, username, password } = req.body;
    const updateUser = new UserModel({
        id,
        name,
        surname,
        username,
        password
    })
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            req.body.password = hash;
            UserModel.findOneAndUpdate({ username, id }, { $set: req.body })
                .then(doc => {
                    const data = doc;
                    res.status(200).json(data);
                })
                .catch(err => console.log(err));
        });
    });
});

module.exports = router;