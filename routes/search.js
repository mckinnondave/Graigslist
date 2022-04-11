const express = require("express");
const router = express.Router();
// const dbHelpers = require();

module.exports = (db, dbHelpers) => {
  // we are using GET, should we use post somehow?
  router.get("/", (req, res) => {
    const searchParams = req.params;
    if (!searchParams) {
      // something in here
    };
    // need some if statements here to make sure not empty search field
    //should find this in tiny app as an example.
    dbHelpers
      .getSearchResults(searchParams, db)
      .then((result) => {
        // console.log("result", result);
        res.send(result);
        const templateVars = { result }; //edit this to send key value pairs...
        res.render("listings", templateVars);
        // console.log("dustins mind is broken here");
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
