const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const gravtar = require('gravatar');
const config = require('config');
const User = require('../../models/User');

const { check, validationResult } = require('express-validator');

//  route PST api/users
//  Register User
//  PUBLIC
router.post('/',
    [
        check('name', 'Name is Required').not().isEmpty(),
        check('email', 'Please include a valid Email').isEmail(),
        check('password', 'Please Enter a password of 6 or more characters').isLength({ min: 6 })
    ],
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() })
        }

        const { name, email, password } = req.body;

        try {
            //  If User exists
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ error: [{ msg: 'User already exists.' }] })
            }

            //  Get User Gravatar
            const avatar = gravtar.url(email, {
                s: '200', // size
                r: 'pg', // not 18+
                d: 'mm' // default image
            })

            user = new User({
                name,
                email,
                password,
                avatar
            });

            //  Encrypt Password
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt)

            await user.save();

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