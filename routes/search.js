const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // we are using GET, should we use post somehow?
  router.get("/", (req, res) => {
    const searchParams = req.params; //probably not right
    db.getSearchResults(searchParams).then(() => {
      console.log("dustins mind is broken here");
    });
    console.log("this is the search route speaking");
    req.query();
    res.redirect("/user");
  });
  return router;
};
