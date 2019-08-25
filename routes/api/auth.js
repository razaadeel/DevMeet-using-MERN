const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//  route GET api/auth
//  TEST route
//  PUBLIC
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//  route PST api/auth
//  Authenticate User & Get Token
//  PUBLIC
router.post('/',
    [
        check('email', 'Please include a valid Email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() })
        }

        const { email, password } = req.body;

        try {
            //  If User exists
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: [{ msg: 'Invalid Email/Password' }] })
            }

            //  Dencrypt Password
            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch){
                return res.status(400).json({ error: [{ msg: 'Invalid Email/Password' }] })
            }

            // Return JSONWEBTOKEN
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload,
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token })
                }
            )
        }
        catch (err) {
            console.log(err.message);
            res.status(500).send('SERVER ERROR');
        }
    }
)


module.exports = router;