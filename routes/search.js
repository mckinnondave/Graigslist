const express = require("express");
const router = express.Router();
// let userObj;
module.exports = (db, dbHelpers) => {
  router.get("/", (req, res) => {
    const searchParams = req.query.name;
    const userObj = req.session.userId;
    // console.log("THE USER OBJ", userObj);
    // console.log("search query", searchParams);
    dbHelpers
      .getSearchResults(searchParams, db, userObj)
      .then((results) => {
        // res.send(results);
        const templateVars = { results, userObj, searchParams };
        console.log(templateVars);
        res.render("search", templateVars);
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

