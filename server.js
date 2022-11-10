const path = require("path");
const express = require("express");
const routes = require("./controllers");
require("dotenv").config();
const session = require("express-session");
const sequelize = require("./config/connection");

const app = express();

const sess = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
};

app.use(session(sess));

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
