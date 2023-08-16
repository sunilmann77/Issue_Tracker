const User = require('../model/user');
const Project = require('../model/project');

module.exports.profile = async function (req, res) {
    try {
      const projects = await Project.find({}).populate('author', 'name');
  
      return res.render('Profile', {
        title: 'User Profile',
        projects: projects,
      });
    } catch (err) {
      console.error('Error in rendering profile:', err);
      return res.redirect('back');
    }
  };
 

// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/signin');
    }

    return res.render('signup', {
        title: "App | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){   

    if (req.isAuthenticated()){
        res.redirect('/users/profile');
    }
    return res.render('signin', {
        title: "Employee | Sign In"
    })
}


// get the sign up data
module.exports.create = function(req, res){  
    if (req.body.password != req.body.confirm_password){
        // req.flash('error', 'Invalid Username/Password');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log(err);
                    console.log('error in creating user while signing up'); return}

                // req.flash('success', 'Account Created Successfully');
                 res.redirect('/users/signin');
            })
        }else{
            return res.redirect('back');
        }
    });
}

// sign in and create a session for the user
module.exports.createSession = function(req, res){
     res.redirect('/users/profile');
}

module.exports.destroySession = function(req, res){    
    req.logout((err)=>{ 
        if (err){
        console.log("error in the signout")
    }
     res.redirect('/'); 
}
)
}


module.exports.destroySession = function(req, res){
    req.logout((err) => { 
        if(err){
            console.log("error in the signout");
        }
            return res.redirect('/');
    }
    )}

    