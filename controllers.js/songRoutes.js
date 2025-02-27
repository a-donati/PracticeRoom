const router = require('express').Router();
const { ensureAuth } = require('../utils/auth');
const { Song } = require('../models');


// get songRoutes route
router.get('/songRoutes', async (req, res) => {

    res.render('song', {
        cssFile: "/css/songSelect.css",
        logged_in: req.session.logged_in
    });
});


// get songRoutes/song route
router.get('/songRoutes/song', async (req, res) => {


    const songPicker = async () => {

        let songs = await Song.findAll();


        let song = songs[Math.floor(Math.random() * songs.length)];
        return (song);

    }

    let song = (await songPicker()).get({ plain: true });

    res.render('youtube', { song, cssFile: "/css/songSelect.css",
    logged_in: req.session.logged_in
});
});


module.exports = router;

