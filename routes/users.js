/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const { render } = require("ejs");
const express = require("express");
const router = express.Router();

module.exports = (db, dbHelpers) => {
  router.get("/", (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.send({ message: "not logged in" });
      return;
    }
    db.query(`SELECT * FROM users;`)
      .then((data) => {
        const users = data.rows;
        res.render("user");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
