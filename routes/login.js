/*
 * All routes for login are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = () => {
  router.get("/:id", (req, res) => {
    // using encrypted cookies
    console.log("hey this is the route");
    req.session.userId = req.params.id;
    // send the user back to home once logged in
    res.redirect("/user");
  });
  return router;
};
