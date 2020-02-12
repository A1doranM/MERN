const {Router} = require("express");
const router = new Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {check, validationResult} = require("express-validator");
const config = require("../config/default");
const User = require("../models/User.model");

// api/auth/register
router.post(
    "/register",
    [
        check("email", "Wrong email").isEmail(),
        check("password", "Password must be longer then 6 symbols").isLength({min: 6}),
    ],
    async (req, res) => {
        try {
            console.log(req.body);
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Wrong data format."
                })
            }

            const {email, password} = req.body;
            const candidate = await User.findOne({email: email});

            if (candidate) {
                res.status(400).json({message: "User already exists."});
                return;
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({email, password: hashedPassword});

            await user.save();
            res.status(201).json({message: "User created."});
        } catch (e) {
            res.status(500).json({
                message: `Server error in auth module: ${e.message}`
            });
        }
    });

router.post(
    "/login",
    [
        check("email", "Wrong email").normalizeEmail().isEmail(),
        check("password", "Password must be longer then 6 symbols").exists(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Wrong data format."
                })
            }

            const {email, password} = req.body;
            const user = await User.findOne({email: email});

            if (!user) {
                res.status(400).json({message: "User does not exists."});
                return;
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({message: "Wrong email or password"});
            }

            const token = jwt.sign(
                {userId: user.id},
                config.jwrSecret,
                {expiresIn: "1h"}
            );

            res.json({token: token, userId: user.id});
        } catch (e) {
            res.status(500).json({
                message: `Server error in auth module: ${e.message}`
            });
        }
    });

module.exports = router;