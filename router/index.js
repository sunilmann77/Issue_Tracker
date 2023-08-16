const express = require('express');
const router = express.Router();
console.log("router  is loaded in index.js");

const homeController = require('../controllers/home_controller');
const projectController = require('../controllers/projectController');

// Route to display project detail page
router.get('/project/projectdetail/:id', projectController.projectDetail);

const passport = require('passport');
router.use('/users',require('./user'));

router.use('/project', require('./project'));
router.use('/issue', require('./issue'));


router.get('/', homeController.home);


module.exports =router;

