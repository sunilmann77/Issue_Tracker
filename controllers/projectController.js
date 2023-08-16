const Project = require('../model/project');
const User = require('../model/user');
const issue = require('../model/issue');

// Route to render the project page
module.exports.project = async function (req, res) {
  try {
    const projects = await Project.find({}).populate('author', 'name');
    return res.render('project', {
      title: 'Projects',
      project:projects,
      issues: issue
    });
  } catch (error) {
    console.error('Error fetching projects:', err);
    return res.status(500).send('Server Error');
  }
};

module.exports.create = async function (req, res) {
  try {
    const { name, description } = req.body;
    const author = req.user.name; // Assuming 'user' field references the 'User' model
    const project = await Project.create({
      name,
      description,
      author,
    });

    console.log('Project created:', project);
    return res.redirect('/users/profile');
  } catch (err) {
    console.error('Error in creating a project:', err);
    return res.redirect('/users/profile');
  }
};

module.exports.projectDetail = async function (req, res) {
  try {
    const projectId = req.params.id;
    const filterLabel = req.query.filterLabel;
    if (filterLabel) {
      project.issues = project.issues.filter(issue => issue.label === filterLabel);
    }
     const project = await Project.findById(projectId).populate('issues').exec();
    if (!project) {
      return res.status(404).send('Project not found');
    }
    return res.render('projectDetail', {
      title: 'Project Detail',
      project: project
    });
  } catch (err) {
    console.error('Error in fetching project details:', err);
    return res.redirect('/');
  }
};

module.exports.createIssue = async function (req, res) {
  try {
    const { title, description, label } = req.body;
    const author = req.user._id; // Assuming 'user' field references the 'User' model

    // Get the project ID from the URL parameter
    const projectId = req.params.id;

    // Create the issue with the provided data
    const issue = await Issue.create({
      title,
      description,
      label,
      author,
      project: projectId, // Assign the issue to the specific project
    });
    console.log('Issue created:', issue);
    return res.redirect('/project/${projectId}'); // Redirect to the project details page
  } catch (err) {
    console.error('Error in creating an issue:', err);
    return res.redirect('/users/profile');
  }
};

module.exports.searchProjects = async function (req, res) {
  try {
    const searchQuery = req.query.search;

    // Find projects that match the search query
    const projects = await Project.find({
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search on project name
        { description: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search on project description
      ],
    }).populate('author', 'name');

    return res.render('project', {
      title: 'Projects',
      projects: projects,
    });
  } catch (err) {
    console.error('Error in searching projects:', err);
    return res.redirect('/');
  }
};
