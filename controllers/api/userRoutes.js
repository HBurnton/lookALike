const router = require("express").Router();
const { User } = require("../../models");

module.exports = router;
router.get("/", async (req, res) => {
  try {
    const allUsers = await User.findAll();
    const users = allUsers.map((user) => user.get({ plain: true }));
    res.json(users);
  } catch (err) {
    res.status(400).json(err);
  }
});
