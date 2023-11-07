const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY
module.exports = {
    register: (req, res) => {
        User.create(req.body)
            .then( user => res.json(user))
            .catch(err => res.status(400).json(err))
    },

    login: async(req, res) => {

        try {
            const user = await User.findOne({ email: req.body.email });

            if (user === null) {
                return res.status(400).json({ msg: "Invalid Login" });
            }

            const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

            if (!isPasswordValid) {
                return res.status(400).json({ msg: "Invalid Login" });
            }
            const userToken = jwt.sign({
                id: user._id
            }, secret);

            res.cookie("usertoken", userToken, { httpOnly: true });
            res.json({ msg: "Successful Login!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "ERROR" });
        }
    },
    logout: (req, res) => {
        res.clearCookie('usertoken');
        res.json({msg: "Logged Out!"})
    },
    findAll:(req, res) => {
        User.find()
            .then(allUsers => res.json(allUsers))
            .catch(err => res.status(400).json(err))
    },
    findOne: (req, res) => {
        User.findById()
    }
}