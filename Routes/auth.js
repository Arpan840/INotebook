const express = require("express");
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require("../Models/User");
const fetchUser = require("./Middleware/FetchUser")
const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken");
const secretKet = "ArpanIsA$ad$oy";


router.post("/CreateUSer", [body('email', "Enter the valid email").isEmail({ min: 3 }),
body('password', "Enter the valid passward").isLength({ min: 5 }),
body('name', "Enter the valid name").isLength({ min: 3 })

], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            res.status(400).json({
                email: "Email already exist"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const AuthToken =  jwt.sign(data, secretKet);



        res.status(201).json({

            success: true,
            AuthToken
        })
    } catch (err) {
        console.log(err)

    }


})
//User Login
router.post("/login", [body('email', "Enter a valid Email").isEmail({ min: 5 }),
body('password', "Enter a valid password").isLength({ min: 5 })], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json("Email or password is wrong");
        }
        const verifyPassword = await bcrypt.compare(password, user.password);
        console.log(verifyPassword)
        if (!verifyPassword) {
            return res.status(400).json("Email or password is wrong ");

        }
        const data = {
            user: {
                id: user.id
            }
        }
        const AuthToken = jwt.sign(data, secretKet);
        res.status(200).json({
            success: true,
            AuthToken
        })
    } catch (err) {
        res.send("Internal server Error");
        console.log(err)
    }

})
//get the user details
router.post("/getUser", fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error: "Unable to get UserId"

        })
    }
})

module.exports = router;