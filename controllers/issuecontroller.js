const Issue = require('../model/issue');
const Project = require('../model/project');
const user = require('../model/user');


module.exports.createIssue = async function (req, res) {
  try {
    const { title, description, label } = req.body;
    const projectId = req.params.id;

    // Create the issue
    const issueData = {
      title,
      description,
      label,
      project: projectId,
      user:user,
    };
    
    const issue = await Issue.create(issueData);
    console.log('Issue created:', issue);

    // Add the issue to the project's issues array
    await Project.findByIdAndUpdate(projectId, { $push: { issues: issue._id } });

    return res.redirect('/');
  } catch (err) {
    console.error('Error in creating an issue:', err);
    return;
  }
};