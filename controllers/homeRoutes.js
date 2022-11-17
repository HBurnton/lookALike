const router = require("express").Router();
const { User, Post } = require("../models");

router.get("/", async (req, res) => {
  try {
    const allPosts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    const posts = allPosts.map((post) => post.get({ plain: true }));
    posts.sort((a,b)=>{
      return b.createdAt - a.createdAt ||
      b.title.localeCompare(a.title);
    })
    res.render("homepage", { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/users/", async (req, res) => {
  try {
    const allUsers = await User.findAll();
    const users = allUsers.map((user) => user.get({ plain: true }));
    res.json(users);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    let newpost = post.get({ plain: true });
    res.render("fullviewpost", { newpost, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.json(err);
  }
});

router.get("/submit", async (req, res) => {
  try {
    res.render("submit", { loggedIn: req.session.loggedIn });
  } catch (err) {
    res.json(err);
  }
});

router.get("/create", async (req, res) => {
  try {
    res.render("newuser", { loggedIn: req.session.loggedIn });
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
