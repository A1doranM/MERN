const jwt = require("jsonwebtoken");
const config = require("../config/default");

module.exports = (req, res, next) => {
    if(req.method === "OPTIONS"){
        return next();
    }
    
    try{
        const token = req.headers.authorization.split(" ")[1];

        if(!token) {
            res.status(401).json({message: "Not authorize"});
        }

        const decoded = jwt.verify(token, config.jwrSecret);
        req.user = decoded;

    } catch (e) {
        res.status(500).json({
            message: `Server error in auth.middleware module: ${e.message}`
        });
    }
};