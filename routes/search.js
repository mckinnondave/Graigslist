const express = require("express");
const router = express.Router();

module.exports = (db, dbHelpers) => {
  router.get("/", (req, res) => {
    const searchParams = req.query.name;
    const userObj = req.session.userId;
    dbHelpers
      .getSearchResults(searchParams, db)
      .then((results) => {
        const templateVars = { results, userObj, searchParams };
        res.render("search", templateVars);
      })
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  return router;
};
