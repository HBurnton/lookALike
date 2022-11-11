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
    console.log(allPosts);
    const posts = allPosts.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render("homepage", { posts });
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

    res.render("fullviewpost", {post});
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
