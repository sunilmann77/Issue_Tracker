const Project = require('../model/project');

module.exports.home = async function (req, res) {
  try {
    // Use await to get the result of the query
    const projects = await Project.find({}).populate('author', 'name');

    return res.render('home', {
      title: 'Home',
      projects: projects,
    });
  } catch (err) {
    console.error('Error in rendering home:', err);
    return res.redirect('back');
  }
};
  
