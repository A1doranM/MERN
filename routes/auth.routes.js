const {Router} = require("express");
const router = new Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {check, validationResult} = require("express-validator");
const config = require("../config/default");
const User = require("../models/User.model");


// api/auth
router.post(
    "/register",
    [
        check("email", "Wrong email").isEmail(),
        check("password", "Password must be longer then 6 symbols").isLength({min: 6}),
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: "Wrong data format."
            })
        }

        const {email, password} = req.body;
        const cadidate = await User.findOne({email: email});

        if(candidate){
            res.status(400).json({message: "User already exists."});
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({email, password: hashedPassword});

        await user.save();

        res.status(201).json({message: "User created."});
    } catch (e) {
        res.status(500).json({
            message: "Something wrong on server."
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

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Wrong data format."
                })
            }

            const {email, password} = req.body;
            const user = await User.findOne({email: email});

            if(!user){
                res.status(400).json({message: "User does not exists."});
                return;
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch){
                return res.status(400).json({message: "Wrong email or password"});
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get("jwtSecret"),
                {expiresIn: "1h"}
                );

            res.status(200).json({token: token, userId: user.id});
        } catch (e) {
            res.status(500).json({
                message: "Something wrong on server."
            });
        }
});

module.exports = router;