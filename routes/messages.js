const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //
  // TO DO: Beef this up, with error and catch etc. Make sure user is logged in
  //
  router.get("/", (req, res) => {
    res.render("messages");
  });
  return router;
};
