// const router = require('express').Router();
// const passport = require('passport');
// // const { User } = require('../../models');
// var LocalStrategy = require('passport-local');
// const { User } = require('../models');

// // authenticate with google - GET route =  auth/google
// // scope - includes what we want to retrieve from user profile
// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

// // get route - auth/google/callback
// // ensure user is authenticated through google
// router.get('/google/callback', passport.authenticate('google', {
//     // if fails, redirect to login/homepage
//     failureRedirect: '/'
// }), (req, res) => {
//     // req.session.save here
//     // console.log(req);
//     // console.log(req)
//     // console.log("USER IS HEREEEE:" + req.user)
//     // console.log("USER ID:" + req.user.id);
//     // console.log("USER ID:" + req.user.id);
//     // https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/express-session/index.d.ts
//     // declaration merging
//     // https://stackoverflow.com/questions/65583885/js-docker-property-user-does-not-exist-on-type-session-partialsessiondat
//     req.session.save(() => {
//         req.session.user_id = req.user.id;
//         req.session.logged_in = true;
//         // res.json({ message: 'You are now logged in!' });
//     });
//     var sessionData = req.session;
//     console.dir(`SESSION DATA` + sessionData)
//     // pass auth and redirect to user dashboard/profile
//     res.redirect('/posts');
// });
// // logout user route - /auth/logout
// router.get('/logout', (req, res) => {
//     req.logout()
//     req.session.destroy();
//     // redirect back to homepage
//     res.redirect('/')
// })

// router.post('/signup', (req, res) => {
//     const user = User.create(req.body);
//     if (user) {
//         res.status(200).end();
//     } else {
//         res.status(500).end();
//     }
//     // console.log('Normal Sign up ID' + req.user.id)
//     // req.session.save(() => {
//     //     req.session.user_id = req.session.user.id;
//     //     req.session.logged_in = true;
//     //     // res.json({ message: 'You are now logged in!' });
//     // });

// })

// // /auth/login
// router.post('/login', passport.authenticate('local', {
//     successRedirect: '/posts',
//     failureRedirect: '/login'
// }, (req, res) => {
//     // req.session.save(() => {
//     //     req.session.user_id = req.session.user.id;
//     //     req.session.logged_in = true;
//     //     // res.json({ message: 'You are now logged in!' });
//     // });
// }));


// module.exports = router;
const router = require('express').Router();
// const { User } = require('../../models');
const { User } = require('../../models/');

router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;