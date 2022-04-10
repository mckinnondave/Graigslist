/*
 * All routes for login are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // set user cookie when logged in
  router.get("/:id", (req, res) => {
    // using encrypted cookies
    req.session.user_id = req.params.id;
    // send the user back to home once logged in
    res.redirect("/user");
  });
  return router;
};

// module.exports = (db) => {

// router.get("/user", (req, res) => {
//   res.render("user");
// });

// // logout a user
// router.post("/logout", (req, res) => {
//   req.session = null;
//   res.redirect("/");
// });
// };

// Browse /users get redirects somewhere
// Read /users/:id show an idividuals profile
// Edit /users/:id patch
// Add /users/ post for register form
// Delete /users/:id/delete delete user

// Browse /listings get shows all listings in some form of grid max 12 per page
// Read /listings/:id show an idividual listing
// Edit /listings/:id patch
// Add /listings/ post for new listing form
// Delete /listings/:id/delete delete listing

// Browse /messages get redirects to a logged in users inbox
// Read /messages/:id probably doesnt show anything
// Edit /messages/:id patch no ability to edit messages
// Add /messages/ post for new message form
// Delete /messages/:id/delete no deleting messages

// Browse /search get redirects to homepage
// Read /search/:id
// Edit /search/:id patch
// Add /search/ post for new search form
// Delete /search/:id/delete no deleting
