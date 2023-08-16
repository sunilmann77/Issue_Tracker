const express = require('express');
const router = express.Router();

const projectController = require('../controllers/projectController');

router.get('/project', projectController.project);
router.get('/projectdetail/:id', projectController.projectDetail);
// Route to handle project search
router.get('/projects', projectController.searchProjects);
// router.get('/projectdetail/:id/create_issue', projectController.projectDetail);

router.post('/create', projectController.create);
module.exports = router;

