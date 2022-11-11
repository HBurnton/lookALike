const router = require("express").Router();
const { Post, User } = require("../../models");

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
    res.json(posts);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/agree/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    let updatedPost = await post.increment("numberAgree");
    await updatedPost.reload();
    res.json(updatedPost);
  } catch (err) {
    res.json(err);
  }
});

router.put("/disagree/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    let updatedPost = await post.increment("numberDisagree");
    await updatedPost.reload();
    res.json(updatedPost);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
