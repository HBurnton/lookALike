const router = require("express").Router();
const { Post, User } = require("../../models");

module.exports = router;

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
