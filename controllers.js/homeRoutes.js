const router = require('express').Router();
const { User, Post, Comment } = require('../models');
// const { ensureAuth, ensureGuest } = require('../utils/auth')
const withAuth = require('../utils/auth');
const axios = require('axios');

// homepage get route
router.get('/', async (req, res) => {
  try {
    // const userData = await User.findByPk(req.session.user_id, {
    //   attributes: { exclude: ['password']},
    //   include: [{model: Post}],
    // })
    // const user = userData.get({plain: true});
    // if (req.session.logged_in) {
    //   // TODO: replace /profile with redirected page
    //   document.location.replace('/posts');
    // }

    res.render('homepage', {
      // posts, 
      logged_in: req.session.logged_in, 
      // ...user,
      cssFile: '/css/home.css'
    })
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password']},
      include: [{model: Post}],
    })

    const user = userData.get({plain: true});

    res.render('dashboard', {
      ...user,
      logged_in: true,
      cssFile: '/css/posts.css',

    });
  }catch(err){
    res.status(500).json(err);
  }
 });


  // Get all posts and JOIN with user data
  router.get('/posts', async (req, res) => {
    try {
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });

      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: true }));
      // Pass serialized data and session flag into template
      res.render('practiceRoom', { 
        cssFile: '/css/home.css',
        posts, 
        logged_in: req.session.logged_in
      })
    }catch(err){
      res.status(500).json(err)
    }
    })

    // get individual post
router.get('/post/:id', async (req, res) => {
  try {
      const postData = await Post.findByPk(req.params.id, {
          include: [
              {
                  model: User,
                  attributes: ['name', 'id'],
              },
              {
                  model: Comment,
                  attributes: ['content', 'user_id', 'date_created'],
                  include: {
                      model: User,
                      attributes: ['name']
                  }
              }
          ]
      });
      const post = postData.get({ plain: true });
      res.render('post', {
        cssFile: '/css/home.css',
         ...post,
         logged_in: req.session.logged_in

       });
  }catch(err){
    console.log(err);
      res.json(err);
  }
})

router.get('/users/login', async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.redirect('/posts');
      return;
    }
    res.render('login', {
      cssFile: '/css/posts.css'
    })

  } catch (err) {
    res.status(500).json(err);
  }
});
// comment
// router.get('/auth/login', (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   if (req.session.logged_in) {
//     res.redirect('/profile');
//     return;
//   }
//   cssFile: '/css/home.css'
//   res.render('login');
// });


module.exports = router;
