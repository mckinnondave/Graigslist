const express = require("express");
const router = express.Router();

module.exports = (db, dbHelpers) => {
  router.get("/", (req, res) => {
    const searchParams = req.query.name;
    const userObj = req.session.userId;
    // console.log("search query", searchParams);
    dbHelpers
      .getSearchResults(searchParams, db)
      .then((results) => {
        // res.send(results);
        const templateVars = { results, userObj };
        res.render("search", templateVars, searchParams);
      })
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
    // console.log("this is the search route speaking");
    // res.redirect("/user");
  });

  return router;
};
