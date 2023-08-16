const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issuecontroller');

// Route to create an issue for a project
router.post('/create_issue/:id', issueController.createIssue);


module.exports = router;

