const router = require("express").Router();
const { User } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      console.log(req.session.loggedIn);
      req.session.user_id = newUser.id;
      res.status(200).json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    console.log(user);

    if (user) {
      const password = await user.checkPassword(req.body.password);
      console.log(password);
      if (password) {
        req.session.save(() => {
          req.session.user_id = user.id;
          console.log(req.session.user_id);
          req.session.loggedIn = true;
          console.log("you are logged in" + req.session.loggedIn);
          res.json({ user: user, message: "login successful" });
        });
      }
    } else {
      res.status(400).json({ message: "Incorrect Email or Password" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    console.log("hey I'm logged in");
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
