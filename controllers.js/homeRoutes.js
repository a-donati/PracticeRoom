const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const { ensureAuth, ensureGuest } = require('../utils/auth')

router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      cssFile: '/css/home.css'
    })
  } catch (err) {
    res.status(500).json(err);
  }
});


// dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    const userData = await User.findOne({where: {username: username}}, {
      attributes: { exclude: ['password']},
      include: [{model: Post}],
    })
    const user = userData.get({plain: true});
    
    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  }catch(err){
    res.status(500).json(err);
  }
 });

// router.get('/dashboard', ensureAuth, async (req, res) => {
//   try {
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password']},
//       include: [{model: Post}],
//     })
//     const user = userData.get({plain: true});

//     res.render('dashboard', {
//       ...user,
//       logged_in: true
//     });
//   }catch(err){
//     res.status(500).json(err);
//   }
//  });



  // Get all posts and JOIN with user data
  router.get('/posts', ensureAuth, async (req, res) => {
    try {
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['displayName'],
          },
        ],
      });

      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: true }));
      // Pass serialized data and session flag into template
      res.render('practiceRoom', { 
        cssFile: '/css/posts.css',
        posts, 
        // logged_in: req.session.logged_in
      })
    }catch(err){
      res.status(500).json(err)
    }
    })

router.get('/post/:id', ensureAuth, async (req, res) => {
  try {
      const postData = await Post.findByPk(req.params.id, {
          include: [
              {
                  model: User,
                  attributes: ['displayName', 'id'],
              },
              {
                  model: Comment,
                  attributes: ['content', 'user_id', 'date_created'],
                  include: {
                      model: User,
                      attributes: ['displayName']
                  }
              }
          ]
      });
      const post = postData.get({ plain: true });
      res.render('post', {
        cssFile: '/css/posts.css',
         ...post,
         logged_in: req.session.logged_in

       });
  }catch(err){
    console.log(err);
      res.json(err);
  }
})

router.get('/auth/login', async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.redirect('/dashboard');
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
