const router = require('express').Router();
const passport = require('passport');
// const { User } = require('../../models');
var LocalStrategy = require('passport-local');
const { User } = require('../models');

// authenticate with google - GET route =  auth/google
// scope - includes what we want to retrieve from user profile
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

// get route - auth/google/callback
// ensure user is authenticated through google
router.get('/google/callback', passport.authenticate('google', {
    // if fails, redirect to login/homepage
    failureRedirect: '/'
}), (req, res) => {
    // req.session.save here
    console.log(req);
    console.log("USER ID:" + req.user.id);

    // req.session.save(() => {
    //     // req.session.user_id = req.session.user.id;
    //     req.session.logged_in = true;
    //     // res.json({ message: 'You are now logged in!' });
    // });
    // pass auth and redirect to user dashboard/profile
    res.redirect('/posts');
});
// logout user route - /auth/logout
router.get('/logout', (req, res) => {
    req.logout()
    req.session.destroy();
    // redirect back to homepage
    res.redirect('/')
})

router.post('/signup', (req, res) => {
    const user = User.create(req.body);
    if (user) {
        res.status(200).end();
    } else {
        res.status(500).end();
    }
    // console.log('Normal Sign up ID' + req.user.id)
    // req.session.save(() => {
    //     req.session.user_id = req.session.user.id;
    //     req.session.logged_in = true;
    //     // res.json({ message: 'You are now logged in!' });
    // });

})

// /auth/login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/posts',
    failureRedirect: '/login'
}, (req, res) => {
    // req.session.save(() => {
    //     req.session.user_id = req.session.user.id;
    //     req.session.logged_in = true;
    //     // res.json({ message: 'You are now logged in!' });
    // });
}));


module.exports = router;
