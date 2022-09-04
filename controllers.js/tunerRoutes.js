
const router = require('express').Router();

// get page
router.get('/tunerRoutes', async (req, res) => {

    res.render('tuner', {
        cssFile: '/css/home.css',
        logged_in: req.session.logged_in

      })
});

module.exports = router;