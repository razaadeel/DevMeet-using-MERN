const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const request = require('request');
const config = require('config');

const Profile = require('../../models/Profile');
const User = require('../../models/User');


//  route GET api/profile/me
//  Get Current User Profile
//  PRIVATE
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);

    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})


//  route GET api/profile
//  Create or Update User Profile
//  PRIVATE
router.post(
    '/',
    [
        auth,
        [
            check('status', 'Status is required').not().isEmpty(),
            check('skills', 'Skills is required').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        // Build profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;
        if (skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim());
        }

        // Build social object
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (instagram) profileFields.social.instagram = instagram;

        try {
            // Using upsert option (creates new doc if no match is found):
            let profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true, upsert: true }
            );
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

//  route GET api/profile
//  GET all Profiles
//  PUBLIC
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json('Server Error')
    }
})


//  route GET api/profile/user/:user_id
//  GET profile by user ID
//  PUBLIC
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

        if (!profile) return res.status(400).json({ msg: 'Profile not found' });

        res.json(profile);
    }
    catch (err) {
        console.log(err.message);

        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).json('Server Error')
    }
})

//  route DELETE api/profile
//  DELETE profile, user, posts
//  PRIVATE
router.delete('/', auth, async (req, res) => {
    try {
        // Remove Profile
        await Profile.findOneAndRemove({ user: req.user.id });
        // Remove User
        await User.findOneAndRemove({ _id: req.user.id });


        res.json({ msg: 'User deleted' });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json('Server Error')
    }
});


//  route PUT api/profile/experience
//  Add Profile experience
//  PRIVATE
router.put('/experience',
    [
        auth,
        [
            check('title', 'Title is require').not().isEmpty(),
            check('company', 'Company is require').not().isEmpty(),
            check('from', 'From Date is require').not().isEmpty()
        ]
    ],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body;

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        }

        try {
            const profile = await Profile.findOne({ user: req.user.id });

            profile.experience.unshift(newExp);

            await profile.save()

            res.json(profile);
        }
        catch (err) {
            console.log(err.message);
            res.status(500).json('Server Error')
        }
    });


//  route PUT api/profile/experience/:exp_id
//  DELETE experience from id
//  PRIVATE
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        // Remove Expreince
        profile.experience = profile.experience.filter(item => {
            return item.id != req.params.exp_id
        });

        await profile.save();

        res.json(profile);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json('Server Error')
    }
});

//  route PUT api/profile/education
//  Add Profile Education
//  PRIVATE
router.put('/education',
    [
        auth,
        [
            check('school', 'School is require').not().isEmpty(),
            check('degree', 'Degree is require').not().isEmpty(),
            check('fieldofstudy', 'Field of Study is require').not().isEmpty(),
            check('from', 'From Date is require').not().isEmpty(),
        ]
    ],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        } = req.body;

        const newEdu = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        }

        try {
            const profile = await Profile.findOne({ user: req.user.id });

            profile.education.unshift(newEdu);

            await profile.save()

            res.json(profile);
        }
        catch (err) {
            console.log(err.message);
            res.status(500).json('Server Error')
        }
    });


//  route PUT api/profile/education/:exp_id
//  DELETE education from id
//  PRIVATE
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        // Remove Expreince
        profile.education = profile.education.filter(item => {
            return item.id != req.params.edu_id
        });

        await profile.save();

        res.json(profile);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json('Server Error')
    }
});

//  route PUT api/profile/github/:username
//  GET user repos from github
//  PUBLIC
router.get('/github/:username', (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${
                req.params.username
                }/repos?per_page=5&sort=created:asc&client_id=${config.get(
                    'githubClientId'
                )}&client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        };

        request(options, (error, response, body) => {
            if (error) console.log(err);

            if (response.statusCode !== 200) {
                res.status(404).json({ msg: 'No github profile found' })
            }

            res.json(JSON.parse(body));
        });

    }
    catch (err) {
        console.log(err.message);
        res.status(500).json('Server Error');
    }
});


module.exports = router;