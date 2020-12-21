const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// TODO: Add a comment describing the functionality of the withAuth middleware
// The withAuth middleware that verifies the user is logged in is called before calling the actual method
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      order: [['date', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['name'],
            },
          ]
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    // console.log("posts are", posts);

    res.render('homepage', {
      posts,
      // TODO: Add a comment describing the functionality of this property
      // passes a variable to the homepage that is tells if anybody is logged into the session
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
      order: [['date', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['name'],
            },
          ]
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    // console.log("posts are", posts);

    res.render('dashboard', {
      posts,
      // TODO: Add a comment describing the functionality of this property
      // passes a variable to the homepage that is tells if anybody is logged into the session
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
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
