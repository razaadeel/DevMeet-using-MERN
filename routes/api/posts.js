const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');


//  route POST api/posts
//  Create a post
//  PRIVATE
router.post('/',
    [
        auth,
        check('text', 'Text is required').not().isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            console.log(req.body)
            const user = await User.findById(req.user.id).select('-password');

            const newPost = new Post(
                {
                    text: req.body.text,
                    name: user.name,
                    avatar: user.avatar,
                    user: req.user.id
                }
            )
            const post = await newPost.save();
            res.json(post);

        } catch (err) {
            console.log(err.message);
            res.status(500).send('server error');
        }

    });

//  route GET api/posts
//  Get all post
//  PRIVATE
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('server error');
    }
});


//  route GET api/posts/:post_id
//  Get post by id
//  PRIVATE
router.get('/:post_id', auth, async (req, res) => {
    try {
        const posts = await Post.findById(req.params.post_id);

        if (!posts) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        res.json(posts);
    }
    catch (err) {
        console.log(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('server error');
    }
});

//  route DELETE api/posts/:post_id
//  DELETE a post 
//  PRIVATE
router.delete('/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        // Check User
        if (post) {
            if (post.user.toString() !== req.user.id) {
                return res.status(401).json({ msg: 'User not authorized' });
            }
            await post.remove();
            res.json({ msg: 'Post removed' });
        }
        else {
            res.status(404).json({ msg: 'Post not found' });
        }
    }
    catch (err) {
        console.log(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }

        res.status(500).send('server error');
    }
});

//  route PUT api/posts/like/:id
//  Like a post
//  PRIVATE
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check if the post is already been liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post already liked' });
        }

        post.likes.unshift({ user: req.user.id });

        await post.save();
        res.json(post.likes);

    } catch (err) {
        res.status(500).send('server error');
    }
});

//  route PUT api/posts/ulike/:id
//  Like a post
//  PRIVATE
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check if the post is already been liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'Post has not yet been liked' });
        }

        // Remove like
        post.likes = post.likes.filter(like => {
            return like.user.toString() != req.user.id;
        });
        
        await post.save();
        res.json(post.likes);

    } catch (err) {
        res.status(500).send('server error');
    }
});

//  route POST api/posts/comment/:post_id
//  Comment on a post
//  PRIVATE
router.post('/comment/:post_id',
    [
        auth,
        check('text', 'Text is required').not().isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            const user = await User.findById(req.user.id).select('-password');
            const post = await Post.findById(req.params.post_id);
            const newComment = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            }

            post.comments.unshift(newComment);

            await post.save();

            res.json(post.comments);

        } catch (err) {
            res.status(500).send('server error');
            console.log(err.message);
        }

    });

//  route DELETE api/posts/comment/:post_id/:comment_id
//  Delete a comment
//  PRIVATE
router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        //Get comment
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);

        if (!comment) return res.status(404).json({ msg: 'Comment does not exist' });

        // check user
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorize' });
        }

        post.comments = post.comments.filter(com => {
            return com !== comment
        })
 
        await post.save();

        res.json(post.comments);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('server error');
    }

});

module.exports = router;