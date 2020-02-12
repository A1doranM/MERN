const {Router} = require("express");
const Link = require("../models/Link.model");
const auth = require("../middleware/Auth.middleware");
const config = require("../config/default");
const router = Router();
const shortid = require("shortid");
router.post("/generate", auth, async (req, res) => {
    try {
        const baseUrl = config.baseUrl;
        const {from} = req.body;
        const code = shortid.generate();

        const existing = await Link.findOne({from});

        if(existing){
            return res.json({link: existing});
        }

        const to = `${baseUrl}/t/${code}`;

        const link = new Link({
            code, to, from, owner: req.user.userId
        });

        await link.save();

        res.status(201).json({link});
    } catch (e) {
        res.status(500).json({
            message: `Server error in links module: ${e.message}`
        });
    }
});

router.get("/", auth, async (req, res) => {
    try {
        const links = await Link.find({owner: req.user.userId});
        res.json(links);
    } catch (e) {
        res.status(500).json({
            message: `Server error in links module: ${e.message}`
        });
    }
});

router.get("/:id", auth, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);
        res.json(link);
    } catch (e) {
        res.status(500).json({
            message: `Server error in links module: ${e.message}`
        });
    }
});

module.exports = router;
