const express = require("express");
const router = express.Router();

module.exports = (db, dbHelpers) => {
  router.get("/", (req, res) => {
    const searchParams = req.params;
    // if (!searchParams) {
    //   // something in here
    // };
    // need some if statements here to make sure not empty search field
    //should find this in tiny app as an example.
    dbHelpers
      .getSearchResults(searchParams, db)
      .then((results) => {
        // console.log("result", results);
        res.send(results);
        const templateVars = { results };
        res.render("listings", templateVars);
      })
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
    console.log("this is the search route speaking");
    // res.redirect("/user");
  });
  return router;
};

// router.get("/properties", (req, res) => {
//   database
//     .getAllProperties(req.query, 20)
//     .then((properties) => res.send({ properties }))
//     .catch((e) => {
//       console.error(e);
//       res.send(e);
//     });
// });
