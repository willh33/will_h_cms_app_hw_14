const router = require('express').Router();
const { User, Project } = require('../models');
const withAuth = require('../utils/auth');

// TODO: Add a comment describing the functionality of the withAuth middleware
// The withAuth middleware that verifies the user is logged in is called before calling the actual method
router.get('/', withAuth, async (req, res) => {
  try {
    const projectData = await Project.findAll({
      order: [['name', 'ASC']],
    });

    const projects = projectData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      projects,
      // TODO: Add a comment describing the functionality of this property
      // passes a variable to the homepage that is tells if anybody is logged into the session
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // TODO: Add a comment describing the functionality of this if statement
  // Checks if the user is already logged in, if so redirects, if not renders the login page
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;