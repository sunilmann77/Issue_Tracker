const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userController');
const User = require('../model/user'); 

console.log("router is loaded in user.js");


router.get('/signup', userController.signUp);
router.get('/signin', userController.signIn);
router.post('/create',userController.create);


router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/signin'}), userController.createSession);



router.post('/create-session', passport.authenticate('local', {
  failureRedirect: '/users/signin'}), async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email, role: req.user.role });

    if (!user) {
      // If the user is not found in the database, it's an invalid user
      req.logout(); // Logout the user
      return res.status(401).send('Invalid credentials');
    }

    req.session.user = user;
    // Redirect the user to the appropriate dashboard page
    if (req.user) {
      res.redirect('/users/profile');
  } 
}catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});




router.get('/profile',passport.checkAuthentication, userController.profile);  
router.get('/signout', userController.destroySession);

module.exports =router;