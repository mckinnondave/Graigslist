const express = require("express");
const router = express.Router();

module.exports = (db, dbHelpers) => {
  router.get("/", (req, res) => {
    const searchParams = req.query.name;
    const userObj = req.session.userId
    console.log("search query", searchParams);
    //might have to change this
    // if (!searchParams) {
    //   // something in here
    // };
    // need some if statements here to make sure not empty search field
    //should find this in tiny app as an example.

    dbHelpers
      .getSearchResults(searchParams, db)
      .then((results) => {
        // console.log("req.query", req.query);
        // console.log("req.params", req.params);
        // console.log("results", results);
        // res.send(results);

        const templateVars = { results, userObj };
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
