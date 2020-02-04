const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// User Model
const User = require("../models/user");

// @route   POST auth
// @desc    Auth user
// @access  Public
router.post("/", (req, res) => {
    const { username, password } = req.body;

    // Simple validation
    if (!username || !password) {
        return res.status(400).json({ msg: "Please enter all fields" });
    }

    // Check for existing user
    User.findOne({ username }).then(user => {
        console.log(user);
        if (!user) return res.status(400).json({ msg: "User Does not exist" });

        // Validate password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

            jwt.sign({ id: user.id },
                config.get("jwtSecret"), { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    return res.status(200).json({
                        token,
                        user: {
                            id: user.id,
                            name: user.name,
                            surname: user.surname,
                            username: user.username,
                            password: user.password
                        }
                    });
                }
            );
        });
    });
});

// // @route   GET /auth/user
// // @desc    Get user data
// // @access  Private
// router.get("/:id", auth, (req, res) => {
//     User.findById(req.user.id)
//         .select("-password")
//         .then(user => res.json(user));
// });

// @route   GET /auth/me/from/token/:token
// @desc    Get current user from token
// @access  Private
router.get("/me/from/token/:token", function(req, res, next) {
    // check header or url parameters or post parameters for token
    // var token = req.body.token || req.query.token;
    let token = req.params.token;
    console.log(token + "U auth");
    if (!token) {
        return res.status(401).json({ message: "Must pass token" });
    }
    // Check token that was passed by decoding token using secret
    jwt.verify(token, config.get("jwtSecret"), (err, user) => {
        if (err) throw err;
        //return user using the id from w/in JWTToken
        User.findOne({
                id: user.id
            },
            (err, user) => {
                if (err) throw err;
                console.log(user);
                return res.status(200).json({
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        surname: user.surname,
                        username: user.username,
                        password: user.password
                    }
                });
            }
        );
    });
});
module.exports = router;