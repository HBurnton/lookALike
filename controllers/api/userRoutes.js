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

router.post("create", async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
