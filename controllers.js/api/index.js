const router = require('express').Router();
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');
const seatGeekRoutes = require('./seatGeekRoutes');
const userRoutes = require('./userRoutes');


router.use('/posts', postRoutes);
router.use('/comments', commentRoutes)
router.use('/seatGeekRoutes', seatGeekRoutes);
router.use('/users', userRoutes);




module.exports = router;

